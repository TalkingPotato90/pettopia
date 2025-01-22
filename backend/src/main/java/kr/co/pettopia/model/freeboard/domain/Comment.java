package kr.co.pettopia.model.freeboard.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import kr.co.pettopia.model.BaseEntity;
import kr.co.pettopia.model.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Builder
@Table(name = "COMMENT")
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_ID")
    private Integer commentId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "POST_ID", referencedColumnName = "POST_ID", foreignKey = @ForeignKey(name = "FK_POST_TO_COMMENT"))
    private Post post;

    @ManyToOne(optional = false)
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_USERS_TO_COMMENT"))
    private User user;

    @Column(name = "CONTENT", columnDefinition = "TEXT", nullable = false)
    private String content;
}
