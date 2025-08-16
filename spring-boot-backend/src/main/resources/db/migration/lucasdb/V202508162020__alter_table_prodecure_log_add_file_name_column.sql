alter table tb_procedure_log add column filename varchar(255);

update tb_procedure_log set filename = "-";

alter table tb_procedure_log modify filename varchar(255) not null;
