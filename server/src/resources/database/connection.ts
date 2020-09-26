import Knex from 'knex'
import path from 'path'
import { EnvironmentOptions } from '../../protocols/infra'

const dbNames = {
  development: path.join(__dirname, 'database.sqlite'),
  test: ':memory:'
}

export function connectionDatabase(databaseEnv: EnvironmentOptions) {
  const databaseConfig = <Knex.Config> {
    client: 'sqlite3',
    connection: {
      filename: dbNames[databaseEnv],
      charset: 'utf8'
    },
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    useNullAsDefault: true,
    log: {
      warn: () => null
    }
  }

  return Knex(databaseConfig)
}
