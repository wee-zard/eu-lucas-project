create table tb_folder_content (
    id bigint AUTO_INCREMENT PRIMARY KEY,
    folder_id bigint,
    image_id bigint,
    bounding_box_id bigint,
    CONSTRAINT tb_folder_content_fk_1 foreign key(folder_id) references tb_folder(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT tb_folder_content_fk_2 foreign key(image_id) references tb_image(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT tb_folder_content_fk_3 foreign key(bounding_box_id) references tb_bounding_box(id) ON UPDATE CASCADE ON DELETE CASCADE
);

create table tb_folder_content_key (
	id bigint AUTO_INCREMENT PRIMARY KEY,
	name varchar(100) unique not null
);

create table tb_folder_content_data (
	id bigint AUTO_INCREMENT PRIMARY KEY,
	folder_content_value varchar(100) not null,
	folder_content_key bigint not null,
	folder_content_id bigint not null,
	CONSTRAINT tb_folder_content_data_fk_1 foreign key(folder_content_key) references tb_folder_content_key(id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT tb_folder_content_data_fk_2 foreign key(folder_content_id) references tb_folder_content(id) ON UPDATE CASCADE ON DELETE CASCADE
);
