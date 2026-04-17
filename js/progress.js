// progress.js - 线索收集系统

// 15条线索清单
const clues = [
    { id: 1, name: "微博：搬家第一天", path: "weibo/posts/20240715.html", found: false },
    { id: 2, name: "微博：垃圾车", path: "weibo/posts/20240722.html", found: false },
    { id: 3, name: "微博：图文店老板", path: "weibo/posts/20240803.html", found: false },
    { id: 4, name: "微博：业主群", path: "weibo/posts/20240810.html", found: false },
    { id: 5, name: "微博：电梯手印", path: "weibo/posts/20240818.html", found: false },
    { id: 6, name: "微博：小禾的画", path: "weibo/posts/20240825.html", found: false },
    { id: 7, name: "微博：最后一条", path: "weibo/posts/20240901.html", found: false },
    { id: 8, name: "业主群8月", path: "wechat-group/202408.html", found: false },
    { id: 9, name: "业主群9月", path: "wechat-group/202409.html", found: false },
    { id: 10, name: "陈屿微博", path: "archive/chen_yu/weibo.html", found: false },
    { id: 11, name: "陈屿草稿箱", path: "archive/chen_yu/last_post.html", found: false },
    { id: 12, name: "贴吧帖子", path: "tieba/post2.html", found: false },
    { id: 13, name: "006档案", path: "archive/patrol/006.html", found: false },
    { id: 14, name: "小禾日记本", path: "xiaohe/index.html", found: false },
    { id: 15, name: "苏晚笔记", path: "suwan/index.html", found: false }
];

// 初始化或读取已收集的线索
function initProgress() {
    let saved = localStorage.getItem("clues_found");
    if (saved) {
        let foundIds = JSON.parse(saved);
        clues.forEach(clue => {
            clue.found = foundIds.includes(clue.id);
        });
    }
}

// 记录找到某条线索
function recordClue(clueId) {
    let saved = localStorage.getItem("clues_found");
    let foundIds = saved ? JSON.parse(saved) : [];
    if (!foundIds.includes(clueId)) {
        foundIds.push(clueId);
        localStorage.setItem("clues_found", JSON.stringify(foundIds));
        clues[clueId - 1].found = true;
        console.log(`%c[线索] 已收集：${clues[clueId - 1].name} (${foundIds.length}/15)`, "color: #8b6b4d");
    }
}

// 获取已收集数量
function getCollectedCount() {
    let saved = localStorage.getItem("clues_found");
    let foundIds = saved ? JSON.parse(saved) : [];
    return foundIds.length;
}

// 检查是否集齐15条
function isComplete() {
    return getCollectedCount() === 15;
}

// 在苏晚笔记底部显示进度和真结局入口
function showTruthProgress() {
    let collected = getCollectedCount();
    let remaining = 15 - collected;
    
    let progressDiv = document.getElementById("truth-progress");
    if (!progressDiv) return;
    
    if (collected === 15) {
        progressDiv.innerHTML = `
            <div style="background:#1a1a1a; padding:15px; margin-top:20px; text-align:center; border:1px solid #8b6b4d;">
                <p style="color:#8b6b4d; margin-bottom:10px;">✨ 你已经收集了全部15条线索！ ✨</p>
                <a href="../ending/truth.html" style="display:inline-block; padding:10px 20px; background:#8b6b4d; color:white; text-decoration:none; border-radius:4px;">🔓 解锁真结局 · 揭开真相 →</a>
            </div>
        `;
    } else {
        progressDiv.innerHTML = `
            <div style="background:#2a1a1a; padding:15px; margin-top:20px; text-align:center; border:1px solid #c44;">
                <p style="color:#c44; margin-bottom:5px;">⚠️ 真结局尚未解锁 ⚠️</p>
                <p style="color:#888; font-size:12px;">已收集 ${collected}/15 条线索，还差 ${remaining} 条</p>
                <p style="color:#666; font-size:11px; margin-top:8px;">继续探索，找到所有隐藏页面...</p>
            </div>
        `;
    }
}

// 页面加载时执行
initProgress();
