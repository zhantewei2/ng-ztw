const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const join=(...args)=>path.join(__dirname,...args);

const ENV=process.env.MODE;
const isProd= ENV==='build';

module.exports=function makeWepbackConfig(){
    const config={};
    config.devtool='source-map';
    config.entry={
        main:join('demo/src/main.ts'),
        polyfills:join('demo/src/polyfills.ts'),
        vendors:join('demo/src/vendors.ts')
    };
    config.output={
        path:join('demo/dist'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    };
    config.module={
      rules:[
          {
              test:/\.ts$/,
              use:'ts-loader'
          },
          {
              test:/\.scss/,
              use:ExtractTextPlugin.extract({
                  fallback:'style-loader',
                  use:['css-loader','sass-loader']
              })
          },
          {
              test:/\.html$/,
              use:'raw-loader'
          }
      ]
    };
    config.plugins=[
        new HtmlWebpackPlugin({
            template:'./demo/src/index.html',
            chunksSortMode:'dependency'
        })
    ];
    config.resolve={
        modules:['node_modules'],
        extensions:['.ts','.js','.css','.scss']
    };

    config.devServer={
        contentBase:join('demo/src'),
      port:4200,
      host:'localhost',
      historyApiFallback:true
    };

    return config;
};
