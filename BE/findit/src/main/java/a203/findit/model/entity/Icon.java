package a203.findit.model.entity;

import javax.persistence.*;

@Entity
public class Icon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "icon_id")
    private Long id;

    @Column(name = "image_url")
    private String imageUrl;

}
