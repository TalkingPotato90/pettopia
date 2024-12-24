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
import kr.co.pettopia.model.user.domain.Users;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "COMMENT")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_ID")
    private Integer commentId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "POST_ID", referencedColumnName = "POST_ID", foreignKey = @ForeignKey(name = "FK_POST_TO_COMMENT"))
    private Post post;

    @ManyToOne(optional = false)
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_USER_TO_COMMENT"))
    private Users users;

    @Column(name = "CONTENT", columnDefinition = "TEXT", nullable = false)
    private String content;

    @CreationTimestamp
    @Column(name= "CREATED_AT", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name="UPDATED_AT")
    private LocalDateTime updatedAt;
}
