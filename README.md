# 一款基于Bootstrap的js分页插件bootstrap-paginator使用实例
<table style=" 532px" cellspacing="0" cellpadding="0" border="1">
<tbody>
<tr>
<td width="129">
<p align="center"><strong>参数名</strong></p>
</td>
<td width="92">
<p align="center"><strong>数据类型</strong></p>
</td>
<td width="71">
<p align="center"><strong>默认值</strong></p>
</td>
<td width="240">
<p align="center"><strong>描述</strong></p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">bootstrapVersion</p>
</td>
<td width="92">
<p align="left">number</p>
</td>
<td width="71">
<p align="left">2</p>
</td>
<td width="240">
<p align="left">搭配使用的Bootstrap版本，2.X&nbsp;的&nbsp;分页必须使用div元素，3.X, 4.X, 5.X分页的必须使用ul元素。请注意与所使用的bootstrap版本对应上。</p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">size</p>
</td>
<td width="92">
<p align="left">string</p>
</td>
<td width="71">
<p align="left">&nbsp;&nbsp;"normal"&nbsp; &nbsp;</p>
</td>
<td width="240">
<p align="left">设置控件的显示大小，是个字符串. 允许的值:&nbsp;<em>mini</em>,&nbsp;<em>small</em>,&nbsp;<em>normal</em>,<em>large</em><em>。</em>值：mini版的、小号的、正常的、大号的。</p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">alignment</p>
</td>
<td width="92">
<p align="left">string</p>
</td>
<td width="71">
<p align="left">&nbsp;"left"</p>
</td>
<td width="240">
<p align="left">设置控件的对齐方式，是个字符串，&nbsp;允许的值用：&nbsp;<em>left</em>,&nbsp;<em>center</em>&nbsp;and<em>right</em>. 即：左对齐、居中对齐、右对齐。</p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">itemContainerClass</p>
</td>
<td width="92">
<p align="left">function</p>
</td>
<td width="71">
<p align="left">&nbsp;</p>
</td>
<td width="240">
<p align="left">该参数接收一个函数，返回一个字符串，该字符串是一个我们自定义的class类样式。当控件内的每个操纵按钮被渲染(render)时，都会调用该函数，</p>
<p align="left">同时把有关该按钮的信息作为参数传入。参数：<strong><em>type</em></strong>,<strong><em>page</em></strong>,&nbsp;<strong><em>current</em></strong>&nbsp;。<strong><em>type</em></strong>为该控件的操作按钮的类型，如上图所示的五种类型：first、prev、page、next、last。</p>
<p align="left"><strong><em>page</em></strong>为该按钮所属第几页。<strong><em>current</em></strong>&nbsp;指示整个控件的当前页是第几页。</p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">currentPage</p>
</td>
<td width="92">
<p align="left">number</p>
</td>
<td width="71">
<p align="left">1</p>
</td>
<td width="240">
<p align="left">设置当前页.</p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">numberOfPages</p>
</td>
<td width="92">
<p align="left">number</p>
</td>
<td width="71">
<p align="left">5</p>
</td>
<td width="240">
<p align="left">设置控件显示的页码数.即：类型为"page"的操作按钮的数量。</p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">totalPages</p>
</td>
<td width="92">
<p align="left">number</p>
</td>
<td width="71">
<p align="left">1</p>
</td>
<td width="240">
<p align="left">设置总页数.</p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">pageUrl</p>
</td>
<td width="92">
<p align="left">function</p>
</td>
<td width="71">
<p align="left">&nbsp;</p>
</td>
<td width="240">
<p align="left">实际上，控件内的每个操作按钮最终会被渲染成超链接，该参数的作用就是设置超链接的链接地址。该参数是个函数，参数为：<strong><em>type</em></strong>,<strong><em>page</em></strong>,&nbsp;<strong><em>current</em></strong><strong><em>。</em></strong></p>
<p align="left">这样我们就可以通过这个函数为每个操作按钮动态设置链接地址。如："http://example.com/list/page/"+page</p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">shouldShowPage</p>
</td>
<td width="92">
<p align="left">boolean/function</p>
</td>
<td width="71">
<p align="left">true</p>
</td>
<td width="240">
<p align="left">该参数用于设置某个操作按钮是否显示，可是个布尔值也可是个函数。当为true时，显示。当为false时，不显示。如果该参数是个函数，需要返回个布尔值，</p>
<p align="left">通过这个返回值判断是否显示。函数有3个参数:&nbsp;<strong><em>type</em></strong>,&nbsp;<strong><em>page</em></strong>,&nbsp;<strong><em>current</em></strong><strong><em>。</em></strong>使用函数的好处是，可以对每个操作按钮进行显示控制。</p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">itemTexts</p>
</td>
<td width="92">
<p align="left">function</p>
</td>
<td width="71">
<p align="left">&nbsp;</p>
</td>
<td width="240">
<p align="left">控制每个操作按钮的显示文字。是个函数，有3个参数:&nbsp;<strong><em>type</em></strong>,&nbsp;<strong><em>page</em></strong>,&nbsp;<strong><em>current</em></strong><strong><em>。</em></strong>通过这个参数我们就可以将操作按钮上的英文改为中文，</p>
<p align="left">如first--&gt;首页，last--&gt;尾页。</p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">tooltipTitles</p>
</td>
<td width="92">
<p align="left">function</p>
</td>
<td width="71">
<p align="left">&nbsp;</p>
</td>
<td width="240">
<p align="left">
不可用
</td>
</tr>
<tr>
<td width="129">
<p align="left">useBootstrapTooltip</p>
</td>
<td width="92">
<p align="left">boolean</p>
</td>
<td width="71">
<p align="left">false</p>
</td>
<td width="240">
<p align="left">设置是否使用Bootstrap内置的tooltip。 true是使用，false是不使用,默认是不使用。</p>
<p align="left">注意：如果使用，则需要引入bootstrap-tooltip.js插件。</p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">bootstrapTooltipOptions</p>
</td>
<td width="92">
<p align="left">object</p>
</td>
<td width="71">
<p align="left">&nbsp;</p>
</td>
<td width="240">
<p align="left">&nbsp;&nbsp;&nbsp;&nbsp;Default:</p>
<p align="left">&nbsp;&nbsp;&nbsp;&nbsp;{</p>
<p align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;animation:&nbsp;true,</p>
<p align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;html:&nbsp;true,</p>
<p align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;placement:&nbsp;'top',</p>
<p align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;selector:&nbsp;false,</p>
<p align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title:&nbsp;"",</p>
<p align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container:&nbsp;false&nbsp;}</p>
<p align="left">该参数是个js对象。当参数useBootstrapTooltip为true时，会将该对象传给Bootstrap的bootstrap-tooltip.js插件。</p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">onPageClicked</p>
</td>
<td width="92">
<p align="left">function</p>
</td>
<td width="71">
<p align="left">&nbsp;</p>
</td>
<td width="240">
<p align="left">为操作按钮绑定click事件。回调函数的参数：<strong><em>event</em></strong>,&nbsp;<strong><em>originalEvent</em></strong>,&nbsp;<strong><em>type</em></strong>,<strong><em>page</em></strong><strong><em>。</em></strong></p>
</td>
</tr>
<tr>
<td width="129">
<p align="left">onPageChanged</p>
</td>
<td width="92">
<p align="left">function</p>
</td>
<td width="71">
<p align="left">&nbsp;</p>
</td>
<td width="240">
<p align="left">为操作按钮绑定页码改变事件，回调函数的参数：<strong><em>event</em></strong>,&nbsp;<strong><em>oldPage</em></strong>,&nbsp;<strong><em>newPage</em></strong><strong><em>。</em></strong></p>
</td>
</tr>
</tbody>
</table>
