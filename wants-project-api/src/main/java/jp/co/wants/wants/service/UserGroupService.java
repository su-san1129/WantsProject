package jp.co.wants.wants.service;

import jp.co.wants.wants.IdGenerator;
import jp.co.wants.wants.domain.BelongsToGroupUsers;
import jp.co.wants.wants.domain.User;
import jp.co.wants.wants.domain.UserGroup;
import jp.co.wants.wants.form.UserGroupForm;
import jp.co.wants.wants.repository.BelongsToGroupUserRepository;
import jp.co.wants.wants.repository.UserGroupRepository;
import jp.co.wants.wants.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserGroupService {
    private final UserGroupRepository userGroupRepository;
    private final BelongsToGroupUserRepository belongsToGroupUserRepository;
    private final UserRepository userRepository;

    public List<BelongsToGroupUsers> saveUserGroup(final UserGroupForm groupForm, final String userId){

        final UserGroup group = userGroupRepository.save(UserGroup.builder()
                .name(groupForm.getName())
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .updatedAt(Timestamp.valueOf(LocalDateTime.now()))
                .build()
        );

        final List<String> mailList = groupForm.getMailList();
        List<User> users = (List<User>) userRepository.saveAll(mailList.stream()
                .map( mailAddress -> User.builder()
                        .mailAddress(mailAddress)
                        .password("hoge") // ランダムな仮パスワードの設定。
                        .isMember(false)
                        .role("MEMBER")
                        .userId(IdGenerator.setPrimaryKey())
                        .build())
                .collect(Collectors.toList()));

        final List<BelongsToGroupUsers> belongsToGroupUsers = users.stream()
                .map(user -> BelongsToGroupUsers.builder()
                        .groupId(group.getId())
                        .userId(user.getUserId())
                        .isOwner(false)
                        .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                        .updatedAt(Timestamp.valueOf(LocalDateTime.now()))
                        .build())
                .collect(Collectors.toList());

        belongsToGroupUsers.add(BelongsToGroupUsers.builder()
                .groupId(group.getId())
                .userId(userId)
                .isOwner(true)
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .updatedAt(Timestamp.valueOf(LocalDateTime.now()))
                .build());

        return  (List<BelongsToGroupUsers>) belongsToGroupUserRepository.saveAll(belongsToGroupUsers);
    }
}
