import { Knex, knex } from 'knex'

async function create_connection(): Promise<Knex> {
    return await require('knex')({
        client: 'mysql2',
        connection: {
            host : 'mariadb-mariadb-pod.sampleapps',
            user : 'myuser',
            password : 'abcde12345',
            database : 'mydb'
        },
        useNullAsDefault: true
    })
}

async function create_table(conn: any, tablename: string) {
    if (! await conn.schema.hasTable(tablename)) {
        await conn.schema.createTable(tablename, function (table: any) {
            table.increments('id')
            table.string('name')
            table.string('description')
        })
    }
}

async function add_data(conn: any, tablename: string) {
    if (await conn.schema.hasTable(tablename)) {
        await conn(tablename).insert([
            {name: "A", description: "AAA"},
            {name: "B", description: "BBB"}
        ])
    }
}

create_connection()
.then(async function(conn: Knex) {
    await create_table(conn, "student")
    await add_data(conn, "student")
    await conn.destroy()
})
