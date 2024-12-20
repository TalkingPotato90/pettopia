package kr.co.pettopia.model.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "ROLE")
public class Role {
    @Id
    @Column(name = "ROLE_ID", nullable = false)
    private String roleId;

    @Column(name = "NAME")
    private String name;
}
