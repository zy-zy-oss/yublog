import{_ as i,c as a,a1 as n,o as l}from"./chunks/framework.D2ql23Gy.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"blogs/学习笔记/无章的知识/如何理解llmapp流式输出.md","filePath":"blogs/学习笔记/无章的知识/如何理解llmapp流式输出.md"}'),t={name:"blogs/学习笔记/无章的知识/如何理解llmapp流式输出.md"};function h(p,s,k,e,r,E){return l(),a("div",null,s[0]||(s[0]=[n(`<p>作为一名前端开发者，理解 LLM（大语言模型）应用中的<strong>流式输出</strong>可以帮助你更好地与后端进行交互，提升用户体验，特别是在处理大数据、长文本或者实时交互的场景中。</p><h3 id="什么是流式输出-streaming-output" tabindex="-1">什么是流式输出（Streaming Output）？ <a class="header-anchor" href="#什么是流式输出-streaming-output" aria-label="Permalink to &quot;什么是流式输出（Streaming Output）？&quot;">​</a></h3><p>流式输出是指数据以连续的、逐步的方式传输到客户端，而不是一次性将所有数据发送完毕。对于 LLM 应用来说，这意味着模型的回答（通常是长文本或复杂响应）是分批次地生成并逐步发送到前端，而不是等待整个回答完成后再发送。</p><p>流式输出通常采用以下技术：</p><ul><li><strong>WebSocket</strong> ：通过持久连接实现实时数据传输。</li><li><strong>Server-Sent Events (SSE)</strong> ：一种允许服务器推送事件到浏览器的机制。</li><li><strong>HTTP/2/3流</strong> ：利用 HTTP 协议的流式特性分段传输响应。</li></ul><h3 id="在-llm-应用中的流式输出" tabindex="-1">在 LLM 应用中的流式输出 <a class="header-anchor" href="#在-llm-应用中的流式输出" aria-label="Permalink to &quot;在 LLM 应用中的流式输出&quot;">​</a></h3><p>在 LLM 应用中，流式输出的实现通常有以下几个关键场景：</p><ol><li><strong>逐字/逐句输出</strong> ：</li></ol><ul><li>当用户向 LLM 发送一个查询时，模型可能需要生成一个长篇回答。流式输出允许每一部分回答（例如一个单词、句子或段落）逐渐传输到前端，用户能看到内容逐步显示，而不是等待整个响应完成。</li><li>这在对话型应用中尤为重要，可以让交互更自然，避免长时间等待。</li></ul><ol><li><strong>即时响应</strong> ：</li></ol><ul><li>传统的模型请求方式是阻塞式的，前端等待后端处理完毕才返回结果。而流式输出则是非阻塞式的，它允许服务器边生成边发送数据给客户端。</li><li>对于LLM来说，生成一个完整的回答可能需要一些时间，尤其是面对复杂的问题或者生成长文本时。通过流式输出，用户会看到逐步生成的内容，这种延迟会显得不那么明显。</li></ul><ol><li><strong>动态反馈</strong> ：</li></ol><ul><li>在流式输出的过程中，前端可以根据接收到的数据动态渲染界面。比如，模拟打字的效果（每个字母逐个出现），或者在每段话生成后立即更新界面，让用户感觉与模型在实时对话。</li></ul><h3 id="前端如何处理流式输出" tabindex="-1">前端如何处理流式输出？ <a class="header-anchor" href="#前端如何处理流式输出" aria-label="Permalink to &quot;前端如何处理流式输出？&quot;">​</a></h3><p>作为前端开发者，你的主要任务是高效处理流式数据流，并将其动态渲染到页面。下面是常见的实现方法和相关概念：</p><ol><li><p><strong>WebSocket / SSE</strong> ：</p><p>大多数流式输出会通过 WebSocket 或 Server-Sent Events（SSE）实现。你可以使用这些技术与服务器建立持久连接，接收数据流。 <strong>WebSocket 示例</strong> ：</p></li></ol><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> socket</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> WebSocket</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ws://example.com/llm-stream&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   socket.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onmessage</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     // 处理流式数据</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">     const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(event.data);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     // 假设返回的data包含流式文本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     displayText</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(data.text);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   };</span></span></code></pre></div><pre><code>**SSE 示例** ：
</code></pre><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> eventSource</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> EventSource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/api/llm-stream&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   eventSource.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onmessage</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">     const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parse</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(event.data);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     displayText</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(data.text);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   };</span></span></code></pre></div><ol><li><strong>动态渲染</strong> ：</li></ol><ul><li>每接收到一部分数据（例如一个单词或句子），就立即更新界面。可以使用逐字输出效果，模拟用户输入时的“打字机”效果。</li><li>可以通过 <code>setInterval</code> 或 <code>setTimeout</code> 来模拟逐字显示，增加流畅感。</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> displayText</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">text</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">     let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> index </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">     const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> intervalId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setInterval</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getElementById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;output&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).innerText </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> text[index];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       index</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">       if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (index </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> text.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">         clearInterval</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(intervalId);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     }, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 每100ms显示一个字符</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span></code></pre></div><ol><li><strong>状态管理</strong> ：</li></ol><ul><li>在流式输出的过程中，你可能需要管理请求的状态，比如正在加载、完成或失败等。可以使用状态管理工具（如 React 的 <code>useState</code> 或 Vue 的 <code>data</code>）来控制 UI 状态。</li></ul><ol><li><strong>错误处理</strong> ：</li></ol><ul><li>流式输出会涉及实时数据的传输，因此错误处理尤为重要。你需要处理连接中断、超时、服务器错误等异常情况，确保用户体验流畅。</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   socket.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onerror</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;WebSocket error:&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, error);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     displayError</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;网络异常，请稍后重试&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   };</span></span></code></pre></div><ol><li><strong>中断和取消请求</strong> ：</li></ol><ul><li>在某些情况下，用户可能希望中断当前请求。你需要处理如何中断流式输出的过程，并给出适当的反馈。</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // 假设用户点击“取消”按钮</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   cancelButton.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onclick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     socket.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">close</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">     displayError</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;请求已取消&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   };</span></span></code></pre></div><h3 id="为什么流式输出对前端开发者重要" tabindex="-1">为什么流式输出对前端开发者重要？ <a class="header-anchor" href="#为什么流式输出对前端开发者重要" aria-label="Permalink to &quot;为什么流式输出对前端开发者重要？&quot;">​</a></h3><ol><li><strong>提升用户体验</strong> ：</li></ol><ul><li>流式输出可以让用户感觉到与 LLM 之间的交互是实时的，避免了等待很长时间才看到完整响应的沉闷体验。</li></ul><ol><li><strong>支持大规模数据处理</strong> ：</li></ol><ul><li>当模型返回大量数据时，流式输出能有效分段传输，避免一次性加载大量数据对性能的影响。</li></ul><ol><li><strong>增强交互性</strong> ：</li></ol><ul><li>通过流式输出，你可以让应用程序在响应生成过程中与用户交互，创建更加动态和个性化的用户界面。</li></ul><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>流式输出是 LLM 应用中非常重要的一部分，尤其是在需要处理大量数据和长时间交互的场景中。作为前端开发者，理解流式输出的原理和如何与后端进行实时数据交互（通过 WebSocket、SSE 等技术），能帮助你创建更流畅、互动性更强的应用。</p>`,39)]))}const o=i(t,[["render",h]]);export{g as __pageData,o as default};
