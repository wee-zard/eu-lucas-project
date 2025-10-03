create table tb_report (
    id bigint AUTO_INCREMENT PRIMARY KEY,
    type varchar(100) not null,
    title varchar(200) not null,
    description varchar(4000) not null,
    user_id bigint not null,
    CONSTRAINT tb_report_fk_1 foreign key(user_id) references tb_user_root(id) ON UPDATE CASCADE ON DELETE CASCADE
);
