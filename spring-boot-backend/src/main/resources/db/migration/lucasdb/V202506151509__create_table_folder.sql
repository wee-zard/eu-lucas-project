create table tb_folder (
    id bigint AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500) NULL,
    owner_user_id bigint NOT NULL,
    created_at Timestamp,
    updated_at Timestamp,
    CONSTRAINT tb_folder_fk_1 foreign key(owner_user_id) references tb_user_root(id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table tb_share_folder (
    folder_id bigint,
    shared_with_user_id bigint,
    is_editable TINYINT(1) NOT NULL,
    created_at Timestamp,
    updated_at Timestamp,
    PRIMARY KEY(folder_id, shared_with_user_id),
    CONSTRAINT tb_share_album_fk_1 foreign key(shared_with_user_id) references tb_user_root(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT tb_share_album_fk_2 foreign key(folder_id) references tb_folder(id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table tb_query_builder (
    id bigint AUTO_INCREMENT PRIMARY KEY,
    parent_id bigint NULL,
    element_relationship TINYINT(1),
    type TINYINT(1),
    CONSTRAINT tb_query_builder_fk_1 foreign key(parent_id) references tb_query_builder(id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table tb_query_element (
    id bigint AUTO_INCREMENT PRIMARY KEY,
    query_builder_id bigint,
    filter_tab int(2) NOT NULL,
    operator int(2) NOT NULL,
    select_input varchar(100) NULL,
    text_field varchar(100) NULL,
    CONSTRAINT tb_query_element_fk_1 foreign key(query_builder_id) references tb_query_builder(id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table tb_folder_content (
    folder_id bigint,
    image_id bigint,
    query_builder_id bigint NOT NULL,
    PRIMARY KEY(folder_id, image_id),
    CONSTRAINT tb_folder_content_fk_1 foreign key(folder_id) references tb_folder(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT tb_folder_content_fk_2 foreign key(image_id) references tb_image(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT tb_folder_content_fk_3 foreign key(query_builder_id) references tb_query_builder(id) ON UPDATE CASCADE ON DELETE CASCADE
);
