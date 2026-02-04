// 在浏览器控制台运行此代码来调试排序信息
// Debug script to find sort information in Emby web page

function debugSortInfo() {
    console.log('=== 调试排序信息 ===');
    
    // 1. 检查 URL 参数
    console.log('\n1. URL 信息:');
    console.log('完整 URL:', window.location.href);
    console.log('Search params:', window.location.search);
    
    const urlParams = new URLSearchParams(window.location.search);
    console.log('sortBy:', urlParams.get('sortBy'));
    console.log('sortOrder:', urlParams.get('sortOrder'));
    
    // 2. 检查容器元素的 dataset
    console.log('\n2. Container dataset 属性:');
    const container = document.querySelector('div[is="emby-itemscontainer"]');
    if (container) {
        console.log('Container dataset:', container.dataset);
        console.log('所有 data-* 属性:');
        for (let key in container.dataset) {
            console.log(`  ${key}:`, container.dataset[key]);
        }
    } else {
        console.log('未找到 container');
    }
    
    // 3. 检查 ApiClient 内部状态
    console.log('\n3. ApiClient 信息:');
    if (typeof ApiClient !== 'undefined') {
        console.log('ApiClient 对象:', ApiClient);
        // 检查可能的排序相关属性
        const possibleKeys = Object.keys(ApiClient).filter(k => 
            k.toLowerCase().includes('sort') || 
            k.toLowerCase().includes('order')
        );
        console.log('包含 sort/order 的属性:', possibleKeys);
    }
    
    // 4. 检查 localStorage
    console.log('\n4. LocalStorage 排序相关:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.toLowerCase().includes('sort') || key.toLowerCase().includes('order')) {
            console.log(`${key}:`, localStorage.getItem(key));
        }
    }
    
    // 5. 检查页面上的排序按钮或选择器
    console.log('\n5. 页面排序控件:');
    const sortButtons = document.querySelectorAll('[class*="sort"], [data-sort], select[name*="sort"]');
    console.log('排序相关元素:', sortButtons);
    sortButtons.forEach((el, i) => {
        console.log(`元素 ${i}:`, {
            tagName: el.tagName,
            className: el.className,
            dataset: el.dataset,
            value: el.value,
            textContent: el.textContent?.substring(0, 50)
        });
    });
    
    // 6. 检查容器的 innerHTML 中是否有排序信息
    console.log('\n6. 检查页面标题/选项:');
    const pageTitle = document.querySelector('.pageTitle, .viewMenuBar, [class*="toolbar"]');
    if (pageTitle) {
        console.log('页面标题区域:', pageTitle.innerHTML.substring(0, 200));
    }
    
    return {
        url: window.location.href,
        urlParams: Object.fromEntries(urlParams),
        containerDataset: container?.dataset,
        sortButtons: Array.from(sortButtons).map(el => ({
            tag: el.tagName,
            class: el.className,
            data: el.dataset
        }))
    };
}

// 运行调试
const sortDebugInfo = debugSortInfo();
console.log('\n=== 调试完成，返回数据: ===', sortDebugInfo);
