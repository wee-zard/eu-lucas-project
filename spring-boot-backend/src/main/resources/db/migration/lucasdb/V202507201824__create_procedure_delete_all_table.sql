drop procedure if exists removeAllDbTableNames;

delimiter //

CREATE PROCEDURE removeAllDbTableNames()
begin
	declare query VARCHAR(512);
	DECLARE done INT DEFAULT FALSE;
	DECLARE tableName VARCHAR(256);
	DECLARE tableNameCursor CURSOR FOR
        SELECT DISTINCT TABLE_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
                where TABLE_SCHEMA like 'lucasdb%';

	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	-- Disable foreign key check
	SET FOREIGN_KEY_CHECKS = 0;

	open tableNameCursor;

	read_loop: loop
		FETCH tableNameCursor INTO tableName;
		IF done THEN
	      LEAVE read_loop;
	    end if;

	    IF tableName = 'flyway_schema_history' THEN
	        DELETE FROM flyway_schema_history;
	    ELSE
            set @query = concat('drop table if exists ', tableName);
            PREPARE stmt FROM @query;
            EXECUTE stmt;
            DEALLOCATE PREPARE stmt;
	    END IF;
	end loop;

	close tableNameCursor;

   	-- Enable foreign key check
    SET FOREIGN_KEY_CHECKS = 1;
end//

delimiter ;
