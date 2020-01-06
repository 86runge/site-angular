// 需要用的npm包
import fs from 'fs'
import glob from 'glob'
import dirsum from 'dirsum'

/**
 * 文件夹路径 --> 文件夹md5
 * @param {String} dirPath 文件夹路径
 * @return {Promise}
 */
function dirsum_md5 (dirPath) {
    return new Promise(function (resolve, reject) {
        dirsum.digest(dirPath, 'md5', function (err, hashes) {
            resolve(err ? '' : hashes.hash)
        })
    })
}

/**
 * 获取glob锚点路径 对应的 文件夹对象合集
 * @param {String} anchor 锚点文件的glob路径
 * @return {Array} 文件夹对象的合集
 */
export function toGetProjectDirs (anchor = 'src/**/build.this'){
    // 锚点文件的文件名
    let anchor_file_name = anchor.split('/').slice(-1);
    return Promise.all(glob.sync(anchor).map(async function (projectFile) {
        // 锚点文件 --> 文件夹路径
        let path = projectFile.match('^(.*?)'+anchor_file_name)[1]
        // 文件夹路径 --> 文件夹md5
        let md5 = await dirsum_md5(path)
        // 封装成对象
        return {path,md5}
    }))
}

/**
 * 比较文件夹变化
 * @param {Array} preDirs 旧文件夹对象的合集
 * @param {Array} nowDirs 新文件夹对象的合集
 * @return {Array} 注意：返回的是新文件夹数组的子集
 */
export function toCompareChange (preDirs,nowDirs){
    return nowDirs.filter(function(nowDir){
        let dirs = preDirs.filter(function(preDir){
            return preDir.path === nowDir.path
        })
        return nowDir.md5 !== (dirs.length > 0 ? dirs[0].md5 : '')
    })
}
