package jp.co.wants.wants.service;

import jp.co.wants.wants.IdGenerator;
import jp.co.wants.wants.domain.BelongsToGroupUsers;
import jp.co.wants.wants.domain.User;
import jp.co.wants.wants.domain.UserGroup;
import jp.co.wants.wants.domain.UserGroupJoinUser;
import jp.co.wants.wants.form.UserGroupForm;
import jp.co.wants.wants.repository.BelongsToGroupUserRepository;
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

@Service
@RequiredArgsConstructor
@Transactional
public class UserGroupService {
    private final UserGroupRepository userGroupRepository;
    private final BelongsToGroupUserRepository belongsToGroupUserRepository;
    private final UserRepository userRepository;
    private final MailSenderService mailSenderService;

    public List<BelongsToGroupUsers> saveUserGroup(final UserGroupForm groupForm, final User loginUser){
        final UserGroup group = userGroupRepository.save(UserGroup.builder()
                .name(groupForm.getName())
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .updatedAt(Timestamp.valueOf(LocalDateTime.now()))
                .build()
        );
        List<User> userList = new ArrayList<>();
        final List<String> mailList = new ArrayList<>();

        groupForm.getMailList().forEach(
                mail -> {
                    final Optional<User> user = userRepository.findByMailAddress(mail);
                    System.out.println("user = " + user);
                    if(user.isPresent()) {
                        userList.add(user.get());
                    } else {
                        System.out.println(mail);
                        mailList.add(mail);
                    }
                });

        System.out.println("userList = " + userList);

        List<User> saveUsers = (List<User>) userRepository.saveAll(mailList.stream()
                .map( mailAddress -> User.builder()
                        .name("sample")
                        .mailAddress(mailAddress)
                        .password("hoge") // ランダムな仮パスワードの設定。
                        .isMember(false)
                        .role("MEMBER")
                        .userId(IdGenerator.setPrimaryKey())
                        .build())
                .collect(Collectors.toList()));

        userList.addAll(List.copyOf(saveUsers));
        System.out.println("userList = " + userList);

        final List<BelongsToGroupUsers> belongsToGroupUsers = userList.stream()
                .map(user -> BelongsToGroupUsers.builder()
                        .userGroupId(group.getId())
                        .userId(user.getUserId())
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

        userList.forEach(user -> mailSenderService.sendForUserGroup(group, user.getMailAddress(), loginUser.getName()));
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
                    .map(bTgu -> userRepository.findByUserId(bTgu.getUserId()).orElseThrow())
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
