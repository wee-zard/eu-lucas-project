alter table tb_folder_content add column log_id bigint;
alter table tb_folder_content add constraint tb_folder_content_fk_3 foreign key (log_id) references tb_procedure_log(id) ON UPDATE CASCADE ON DELETE CASCADE;
