package a203.findit.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "Item-User")
public class ItemUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_user_id")
    private Long id;

}
