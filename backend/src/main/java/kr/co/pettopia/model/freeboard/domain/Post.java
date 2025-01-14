package kr.co.pettopia.model.freeboard.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import kr.co.pettopia.model.BaseEntity;
import kr.co.pettopia.model.user.domain.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@Builder
@Table(name = "POST")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Post extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "POST_ID", updatable = false)
    private Integer postId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", foreignKey = @ForeignKey(name = "FK_USERS_TO_POST"))
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "CATEGORY_ID", referencedColumnName = "CATEGORY_ID", foreignKey = @ForeignKey(name = "FK_CATEGORY_TO_POST"))
    private Category category;

    @Column(name="TITLE", length = 100 , nullable = false)
    private String title;

    @Column(name = "CONTENT", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "VIEW", columnDefinition = "INTEGER DEFAULT 0")
    private Integer view;

    @Column(name = "RECOMMEND", columnDefinition = "INTEGER DEFAULT 0")
    private Integer recommend;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Comment> comments;

    public void updateViewCount(){
        if(this.view == null){
            this.view = 0;
        }
        this.view++;
    }

    public void updatePost(String title, String content) {
        this.title = title;
        this.content = content;
    }
}