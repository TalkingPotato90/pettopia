package kr.co.pettopia.model.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Data;

@Entity
@Data
public class Permission {
    @Id
    @JoinColumn(name = "ROLE_ID", referencedColumnName = "ROLE_ID", foreignKey = @ForeignKey(name = "FK_ROLE_TO_PERMISSION"))
    private String roleId;

    @Column(name = "EDIT_OWN_POST")
    private boolean editOwnPost;

    @Column(name = "EDIT_ALL_POST")
    private boolean editAllPost;

    @Column(name = "EDIT_OWN_COMMENT")
    private boolean editOwnComment;

    @Column(name = "EDIT_ALL_COMMENT")
    private boolean editAllComment;
}
