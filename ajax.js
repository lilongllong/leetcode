/**
 * 手写ajax
 */

const ajax = (options) => {
    return new Promise((resolve, reject) => {
        const { method, url, headers } = options || {};
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        Object.keys(headers).forEach(item => {
            xhr.setRequestHeader(item, headers[item]);
        });
        xhr.onreadystatechange = (event) => {
            if (xhr.readyState !== 4) { // 0 unsent 1 opend 2 Headers_received 3 loading 4 done
                return;
            }
            // 请求到 + 缓存到
            if (xhr.status === 200 || xhr.status === 304) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(xhr.Error))
            }
        }
        xhr.onerror = (error) => {
            reject(error);
        }
        xhr.onabort = () => {
            reject(new Error('aborted'));
        }
        xhr.send();
    });
}

ajax({ method: 'get', url: 'https://www.baidu.com', headers: {} }).then(res => {
    console.log(res, '成功');
}).catch(error => { console.error(error, '失败') });