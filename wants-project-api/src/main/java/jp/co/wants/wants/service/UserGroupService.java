package jp.co.wants.wants.service;

import jp.co.wants.wants.IdGenerator;
import jp.co.wants.wants.domain.*;
import jp.co.wants.wants.form.UserGroupForm;
import jp.co.wants.wants.repository.BelongsToGroupUserRepository;
import jp.co.wants.wants.repository.PreUserRepository;
import jp.co.wants.wants.repository.UserGroupRepository;
import jp.co.wants.wants.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Transactional
public class UserGroupService {
    private final UserGroupRepository userGroupRepository;
    private final BelongsToGroupUserRepository belongsToGroupUserRepository;
    private final UserRepository userRepository;
    private final PreUserRepository preUserRepository;
    private final MailSenderService mailSenderService;

    public List<BelongsToGroupUsers> saveUserGroup(final UserGroupForm groupForm, final User loginUser){
        final UserGroup group = userGroupRepository.save(UserGroup.builder()
                .name(groupForm.getName())
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .updatedAt(Timestamp.valueOf(LocalDateTime.now()))
                .build()
        );
        List<String> userIdList;
        List<User> existUsers = new ArrayList<>();
        final List<String> mailList = new ArrayList<>();

        groupForm.getMailList().forEach(
                mail -> {
                    final Optional<User> user = userRepository.findByEmail(mail);
                    final Optional<PreUser> preUser = preUserRepository.findByEmail(mail);
                    if(user.isPresent()) {
                        existUsers.add(user.get());
                    } else if(preUser.isPresent()) {
                    } else {
                        mailList.add(mail);
                    }
                });

        List<PreUser> saveUsers = (List<PreUser>) preUserRepository.saveAll(mailList.stream()
                .map( email -> PreUser.builder()
                        .email(email)
                        .userId(IdGenerator.setPrimaryKey())
                        .build())
                .collect(Collectors.toList()));
        userIdList = Stream.concat(saveUsers.stream().map(PreUser::getUserId), existUsers.stream().map(User::getUserId)).collect(Collectors.toList());

        final List<BelongsToGroupUsers> belongsToGroupUsers = userIdList.stream()
                .map(userId -> BelongsToGroupUsers.builder()
                        .userGroupId(group.getId())
                        .userId(userId)
                        .isOwner(false)
                        .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                        .updatedAt(Timestamp.valueOf(LocalDateTime.now()))
                        .build())
                .collect(Collectors.toList());

        belongsToGroupUsers.add(BelongsToGroupUsers.builder()
                .userGroupId(group.getId())
                .userId(loginUser.getUserId())
                .isOwner(true)
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .updatedAt(Timestamp.valueOf(LocalDateTime.now()))
                .build());

        saveUsers.forEach(preUser -> mailSenderService.sendToNewUserForUserGroup(group, preUser, loginUser.getName()));
        existUsers.forEach(user -> mailSenderService.sendForUserGroup(group, user.getEmail(), loginUser.getName()));

        return  (List<BelongsToGroupUsers>) belongsToGroupUserRepository.saveAll(belongsToGroupUsers);
    }

    public UserGroup getUserGroupById(final Integer id) {
        return userGroupRepository.findById(id).orElseThrow();
    }

    public List<UserGroupJoinUser> getUserGroupByUserId(String id) {
        final List<Integer> allByUserId = belongsToGroupUserRepository.findAllByUserId(id).stream()
                .map(BelongsToGroupUsers::getUserGroupId)
                .collect(Collectors.toList());

        final List<UserGroup> userGroups = allByUserId.stream()
                .map(groupId -> userGroupRepository.findById(groupId).orElseThrow())
                .collect(Collectors.toList());

        return userGroups.stream().map(userGroup -> {
            final List<BelongsToGroupUsers> allByGroupId = belongsToGroupUserRepository.findAllByGroupId(userGroup.getId());
            final List<User> users = allByGroupId.stream()
                    .map(bTgu -> userRepository.findByUserId(bTgu.getUserId()).orElseGet(()-> {
                        final PreUser preUser = preUserRepository.findByUserId(bTgu.getUserId()).orElseThrow();
                        return User.builder().userId(preUser.getUserId()).email(preUser.getEmail()).build();
                    }))
                    .collect(Collectors.toList());
            return UserGroupJoinUser.builder()
                    .id(userGroup.getId())
                    .name(userGroup.getName())
                    .createdAt(userGroup.getCreatedAt())
                    .updatedAt(userGroup.getUpdatedAt())
                    .belongsToGroupUsersList(users)
                    .build();
        }).collect(Collectors.toList());
    }
}
