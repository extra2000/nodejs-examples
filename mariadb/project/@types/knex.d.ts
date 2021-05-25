import { Knex as KnexOriginal } from 'knex';

declare module 'knex' {
    namespace Knex {
        interface QueryBuilder {
            customSelect<TRecord, TResult>(value: number): KnexOriginal.QueryBuilder<TRecord, TResult>;
        }
    }
}
