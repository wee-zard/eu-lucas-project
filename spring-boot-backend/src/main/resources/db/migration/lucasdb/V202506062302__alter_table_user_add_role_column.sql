alter table tb_user_root add column role_id int(1);
alter table tb_user_root add CONSTRAINT tb_user_rlfk_2 foreign key(role_id) references tb_role(id) ON UPDATE CASCADE ON DELETE RESTRICT;
