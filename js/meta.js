// meta.js - 翠苑ARG统一Meta模块

(function() {
    // 1. 记录访问
    let lastVisit = localStorage.getItem("last_visit");
    let visitCount = parseInt(localStorage.getItem("visit_count") || "0") + 1;
    let currentPath = window.location.pathname;
    
    localStorage.setItem("last_visit", new Date().toISOString());
    localStorage.setItem("visit_count", visitCount);
    localStorage.setItem("last_path", currentPath);
    
    // 2. 显示设备信息
    let device = "未知设备";
    let isMobile = false;
    if(navigator.userAgent.indexOf("iPhone") !== -1) {
        device = "iPhone";
        isMobile = true;
    } else if(navigator.userAgent.indexOf("Android") !== -1) {
        device = "Android手机";
        isMobile = true;
    } else if(navigator.userAgent.indexOf("Windows") !== -1) {
        device = "Windows电脑";
    } else if(navigator.userAgent.indexOf("Mac") !== -1) {
        device = "Mac电脑";
    }
    
    // 3. 显示本地时间
    let now = new Date();
    let hour = now.getHours();
    let timeStr = now.toLocaleTimeString("zh-CN");
    let isLateNight = (hour >= 0 && hour < 5);
    
    // 4. 控制台输出（伪装成角色留言）
    console.log("%c[系统] 翠苑三区601 · 访问记录", "color: #666");
    console.log(`%c[系统] 你正在使用 ${device} · 当前时间 ${timeStr}`, "color: #888");
    
    if(visitCount === 1) {
        console.log("%c[林述] 有人来看我的微博了吗？", "color: #8b6b4d");
    } else if(visitCount === 2) {
        console.log("%c[苏晚] 你上次来过。别查了，求你了。", "color: #c44");
    } else if(visitCount === 3) {
        console.log("%c[602租客] ... 你还在看。", "color: #333");
        console.log("%c[系统] 你已经看了 " + visitCount + " 次。", "color: #c44");
    } else if(visitCount >= 4) {
        console.log("%c[系统] 你已经看了 " + visitCount + " 次。它知道你了。", "color: #c44");
    }
    
    if(isLateNight) {
        console.log("%c[系统] 现在是凌晨。你听到脚步声了吗？", "color: #aa5555");
    }
    
    // 5. 页面标题动态变化
    let originalTitle = document.title;
    setTimeout(() => {
        if(isLateNight) {
            document.title = "你在看什么";
        } else if(visitCount >= 3) {
            document.title = "它知道你在看";
        }
        setTimeout(() => {
            document.title = originalTitle;
        }, 3000);
    }, 5000);
    
    // 6. 假装在线人数（随机）
    let onlineCount = Math.floor(Math.random() * 5) + 1;
    let metaDiv = document.createElement("div");
    metaDiv.style.cssText = "position:fixed; bottom:10px; right:10px; font-size:10px; color:#888; z-index:9999; background:rgba(0,0,0,0.6); padding:4px 10px; border-radius:20px; font-family:monospace;";
    metaDiv.innerHTML = `👁️ ${onlineCount} 人正在查看`;
    document.body.appendChild(metaDiv);
    
    // 7. 根据之前访问过的路径显示提示
    let lastPath = localStorage.getItem("last_path");
    if(lastPath && lastPath !== currentPath) {
        let lastPageName = lastPath.split("/").pop().replace(".html", "");
        setTimeout(() => {
            console.log(`%c[系统] 你从 ${lastPageName} 过来的。`, "color: #666");
        }, 2000);
    }
    
    // 8. 第二天新内容检查（在主页单独实现，这里只记录日期）
    let lastDate = localStorage.getItem("last_date");
    let today = new Date().toDateString();
    if(lastDate !== today) {
        localStorage.setItem("new_content_available", "true");
        localStorage.setItem("last_date", today);
    }
})();