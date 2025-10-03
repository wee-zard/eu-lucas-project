alter table tb_report add column status bigint not null;
alter table tb_report add CONSTRAINT tb_report_fk_2 foreign key(status) references tb_report_status(id) ON UPDATE CASCADE ON DELETE RESTRICT;
