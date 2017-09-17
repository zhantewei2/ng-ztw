const fs=require('fs');
const zlib=require('zlib');
const sendFile=(ctx,fd,type)=>{
	return new Promise((resolve,reject)=>{
	ctx.res.statusCode=200;
	const end=()=>{
		ctx.res.end();
		resolve();
	};
	fs.fstat(fd,(err,stats)=>{
		const size=stats.size;
		if(size<=0)return end();
		const bufferSize=200;
		const mfTime=Math.round(stats.mtimeMs);
		if(ctx.get('If-None-Match')==mfTime){
			ctx.res.statusCode=304;
			return end()
		}
		let nowPos=0;
		ctx.res.writeHead(200,{
			'Content-Type':type,
			'Content-Encoding':'gzip',
			'Etag':mfTime
		});
		const read=()=>{
			let dis=size-nowPos;
			dis=dis>bufferSize?bufferSize:dis;
			let buffer=Buffer.alloc(dis);
			fs.read(fd,buffer,0,dis,nowPos,(err,btRead,bf)=>{
				nowPos+=bufferSize;
				ctx.res.write(bf);
				nowPos>=size?end():read();
			})
		}
		read();
	})
	})
};
module.exports=function(path){
	return async(ctx,next)=>{
		const main=path+'/index.html';
		const name=ctx.url=='/'?main:path+ctx.url;
		let type='text/html';
		if(ctx.url.match(/\.css$/))type='text/css';
		let body=await new Promise((resolve,reject)=>{
			fs.open(name,'r',(err,fd)=>{

				if(err){
					fs.open(main,'r',(err,fd)=>{
						sendFile(ctx,fd,type).then(()=>resolve)
                    })
				}else{
					sendFile(ctx,fd,type).then(()=>resolve())
				}
			})
		})
		
	}

}