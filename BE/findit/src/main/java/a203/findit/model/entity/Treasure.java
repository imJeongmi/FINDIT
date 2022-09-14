package a203.findit.model.entity;

import javax.persistence.*;

@Entity
public class Treasure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "treasure_id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @Column(name = "treasure_name", unique = true,nullable = false)
    private String treasureName;

    @Column(name = "is_default")
    private boolean isDefault;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
