const HttpStatus = require('http-status')
const Queries = require("./queries")

class TablesController extends Queries {
    constructor() {
        super("mesa", ['nome'])
    }

    create(params){
        return this.createConnectionSQL()
        .then(()=>{
            return new Promise((resolve, reject)=>{
                this.conn.connect((err)=>{
                    if(err){
                        reject(err)
                    }else{
                        console.log(params)
                        const sql = `INSERT INTO ${this.table} (${this.strColumns}) VALUES ("${params.nome_mesa}")`

                        this.conn.query(sql,(err, result)=>{
                            if(err){
                                reject(err)
                            }else{
                                resolve(result)
                            }
                        })
                    }
                })
            })
        })
        .then((res)=>{
            this.conn.end()
            return Promise.resolve(res)
        })
        .catch((err)=>{
            this.conn.end()
            return Promise.reject(err)
        })
    }
}

module.exports = TablesController;