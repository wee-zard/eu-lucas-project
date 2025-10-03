create table tb_email_type(
    id bigint AUTO_INCREMENT PRIMARY KEY,
    name varchar(50) not null
);

insert into tb_email_type(name) values("REPORT_EMAIL");
insert into tb_email_type(name) values("USER_CREATION_EMAIL");
