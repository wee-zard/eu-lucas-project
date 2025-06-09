create table tb_role(
    id int(1) not null primary key,
    role_name TEXT not null
);

insert into tb_role values(1, "Admin");
insert into tb_role values(2, "Professor");
insert into tb_role values(3, "Student");