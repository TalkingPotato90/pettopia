package kr.co.pettopia.model.freeboard.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "POST")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "POST_ID")
    private Integer postId;

// TODO : User 엔티티 생성되면 할 일
//    @ManyToOne(optional = false)
//    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_USER_TO_POST"))
//    private User user;

    @Column(name = "CATEGORY_ID", nullable = false)
    private String categoryId;

    @Column(name="TITLE", length = 100 , nullable = false)
    private String title;

    @Column(name = "CONTENT", columnDefinition = "TEXT", nullable = false)
    private String content;

    @CreationTimestamp
    @Column(name= "CREATED_AT", updatable = false)
    private LocalDateTime createAt;

    @UpdateTimestamp
    @Column(name="UPDATED_AT")
    private LocalDateTime updatedAt;
}
