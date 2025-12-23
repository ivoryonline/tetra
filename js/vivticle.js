/* ========================================
   VIVTICLE ENGINE
   ========================================
   
   This file handles rendering your posts.
   You don't need to edit this unless you
   want to customize how posts are displayed.
   
   ======================================== */

function parseContent(content) {
    let html = content.trim();
    
    // Split into paragraphs (double line breaks)
    const paragraphs = html.split(/\n\n+/);
    
    html = paragraphs.map(para => {
        para = para.trim();
        if (!para) return '';
        
        // Parse images {{url}}
        para = para.replace(/\{\{([^}]+)\}\}/g, '<a href="$1" target="_blank"><img src="$1" alt="Blog image"></a>');
        
        // Parse custom emojis :emojiname:
        para = para.replace(/:([a-zA-Z0-9_-]+):/g, (match, emojiName) => {
            if (window.customEmojis && window.customEmojis[emojiName]) {
                return `<img class="emoji" src="${window.customEmojis[emojiName]}" alt=":${emojiName}:" title=":${emojiName}:">`;
            }
            return match; // Return original if emoji not found
        });
        
        // Parse links [text](url)
        para = para.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        
        // Parse bold and italic ***text***
        para = para.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
        
        // Parse bold **text**
        para = para.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        // Parse italic *text*
        para = para.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        
        // If it's just an image link, don't wrap in <p>
        if (para.match(/^<a href=.*<img /)) {
            return para;
        }
        
        // Replace single line breaks with <br>
        para = para.replace(/\n/g, '<br>');
        
        return '<p>' + para + '</p>';
    }).join('');
    
    return html;
}

function parseEmojisInTitle(title) {
    // Parse custom emojis :emojiname: in titles
    return title.replace(/:([a-zA-Z0-9_-]+):/g, (match, emojiName) => {
        if (window.customEmojis && window.customEmojis[emojiName]) {
            return `<img class="emoji" src="${window.customEmojis[emojiName]}" alt=":${emojiName}:" title=":${emojiName}:">`;
        }
        return match;
    });
}

function renderPosts() {
    const container = document.getElementById('posts-container');
    
    if (!posts || posts.length === 0) {
        container.innerHTML = '<div class="post"><h1>No posts yet</h1><p>Add some posts to the posts array to get started!</p></div>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post';
        
        const postHTML = `
            <h1>${parseEmojisInTitle(post.title)}</h1>
            <h2 class="post-date">${post.date}</h2>
            <div class="post-content">
                ${parseContent(post.content)}
            </div>
        `;
        
        postElement.innerHTML = postHTML;
        container.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', renderPosts);
