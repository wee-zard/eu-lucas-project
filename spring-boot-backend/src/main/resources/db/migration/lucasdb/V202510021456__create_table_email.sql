create table tb_email(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    created_at Timestamp,
    updated_at Timestamp,
    type bigint not null,
    content TEXT not null,
    CONSTRAINT tb_email_fk_1 foreign key(type) references tb_email_type(id) ON UPDATE CASCADE ON DELETE CASCADE
);
