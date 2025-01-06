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
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "POST")
public class Post extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "POST_ID")
    private Integer postId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_USER_TO_POST"))
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "CATEGORY_ID", referencedColumnName = "CATEGORY_ID", foreignKey = @ForeignKey(name = "FK_CATEGORY_TO_POST"))
    private Category category;

    @Column(name="TITLE", length = 100 , nullable = false)
    private String title;

    @Column(name = "CONTENT", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "VIEW")
    private Integer view;

    @Column(name = "RECOMMEND")
    private Integer recommend;
}
