const fs=require('fs');
const zlib=require('zlib');

const filterType=(name)=>{
	const index=name.lastIndexOf('.')+1;
	if(!index||index==name.length){
		return {type:'text/html',gzip:true}
	}else{
		const suf=name.slice(index);
		if(suf=='css'){
			return {type:'text/css',gzip:true};
		}else if(suf=='ico'){
			return {type:'image/x-icon',gzip:false};
		}else{
			return {type:'text/html',gzip:true};
		}
	}
};


const sendFile=(ctx,fd,name)=>{
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
		const typeState=filterType(name);
		const header={
            'Content-Type':typeState.type,
            'Etag':mfTime
		};
		if(typeState.gzip)header['Content-Encoding']='gzip';
		ctx.res.writeHead(200,header);
        let nowPos=0;
		const read=()=>{
			let dis=size-nowPos;
			dis=dis>bufferSize?bufferSize:dis;
			let buffer=Buffer.alloc(dis);
			fs.read(fd,buffer,0,dis,nowPos,(err,btRead,bf)=>{
				nowPos+=bufferSize;
				ctx.res.write(bf);
				nowPos>=size?end():read();
			})
		};
		read();
	})
	})
};
module.exports=function(path){
	return async(ctx,next)=>{
		const main=path+'/index.html';
		const name=ctx.url=='/'?main:path+ctx.url;
		let body=await new Promise((resolve,reject)=>{
			fs.open(name,'r',(err,fd)=>{
				if(err){
					fs.open(main,'r',(err,fd)=>{
						sendFile(ctx,fd,name).then(()=>resolve)
                    })
				}else{
					sendFile(ctx,fd,name).then(()=>resolve())
				}
			})
		})
		
	}

}