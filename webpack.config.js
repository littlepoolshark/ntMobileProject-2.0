let path=require("path");
let webpack=require("webpack");
let HtmlWebpackPlugin=require("html-webpack-plugin");//generate a html file to serve the bundle.js of webpack build
//let RemoveConsolePlugin =require("remove-console-plugin");//remove console.log and other statements from webpack build

module.exports={
    entry:[
        "react-hot-loader/patch",
        //activate HMR for React

        "webpack-dev-server/client?http://192.168.1.26:3001",
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        "webpack/hot/only-dev-server",
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        "./src_reconstitution/js/index.js"
        // the entry point of our app
    ],
    output:{
        path:path.join(__dirname,"dist"),

        publicPath:"/",
        // necessary for HMR to know where to load the hot update chunks

        filename:"app.[hash].js"
    },
    devServer:{
        host:"192.168.1.26",
        port:3001,
        publicPath:"/",
        contentBase:path.resolve(__dirname,"dist"),
        hot:true
        // enable HMR on the server
        //Setting set devServer: { hot: true } causes webpack will expose the module.hot API to our code
    },
    devtool:"eval",
    //这个配置项决定了webpack生成source map的方式，而不同的配置值会影响webpack的编译速度的。

    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader"
            },
            {
                test:/\.scss|css$/,
                //@see:https://webpack.js.org/loaders/sass-loader/#components/sidebar/sidebar.jsx

                use:[
                    "style-loader",
                    //creates style nodes from Js strings

                    "css-loader",
                    //translated Css into CommonJS

                    "postcss-loader",
                    //using postcss tool to finished the extra job of Css(e.g. autoprefix plugin)

                    "resolve-url-loader",
                    //resolve the url("......") problems in Sass/Css file

                    "sass-loader?sourceMap"
                    //compiles Sass to Css
                ]
            },
            {
                test:/\.(png|jpg|gif|woff|svg|ttf|otf)$/,
                //return a  data URL if the file is smaller than a byte limit
                //@see:https://webpack.js.org/loaders/url-loader/

                loader:"url-loader?limit=25000"
            }
        ]
    },
    plugins:[
         new webpack.HotModuleReplacementPlugin(),
         // enable HMR globally

         new webpack.NamedModulesPlugin(),
         // prints more readable module names in the browser console on HMR updates

         new HtmlWebpackPlugin({ hash: false, template: "./index.html" }),
         //use the template to serve the bundle js

         //new RemoveConsolePlugin()
         //so weird,it does not work!!Maybe we should try it later.
         //@see:https://github.com/matt-mcdaniel/RemoveConsolePlugin
    ]

}