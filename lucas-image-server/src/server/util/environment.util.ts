import process from 'process';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + './../../../.env' });

class EnvironmentUtil {
  constructor(
    public isTmpFolderInUse: boolean = process.env.USE_IS_TMP_FOLDER_IN_USE === 'true',
    public port: number = Number(process.env.USE_PORT_FOR_SERVER) ?? 6792
  ) {}
}

export default EnvironmentUtil;
