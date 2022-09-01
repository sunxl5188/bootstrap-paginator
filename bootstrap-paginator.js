/**
 * bootstrap-paginator.js v0.5
 * --
 * Copyright 2013 Yun Lai <lyonlai1984@gmail.com>
 * --
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

;(function ($) {
  'use strict' // jshint ;_;

  /* Paginator PUBLIC CLASS DEFINITION
   * ================================= */

  /**
   * Boostrap Paginator Constructor
   *
   * @param element element of the paginator
   * @param options the options to config the paginator
   *
   * */
  var BootstrapPaginator = function (element, options) {
      this.init(element, options)
    },
    old = null

  BootstrapPaginator.prototype = {
    /**
     * Initialization function of the paginator, accepting an element and the options as parameters
     *
     * @param element element of the paginator
     * @param options the options to config the paginator
     *
     * */
    init: function (element, options) {
      this.$element = $(element)

      var version =
          options && options.bootstrapVersion
            ? options.bootstrapVersion
            : $.fn.bootstrapPaginator.defaults.bootstrapVersion,
        id = this.$element.attr('id')

      if (version === 2 && !this.$element.is('div')) {
        throw 'in Bootstrap version 2 the pagination must be a div element. Or if you are using Bootstrap pagination 3. Please specify it in bootstrapVersion in the option'
      } else if (version > 2 && !this.$element.is('ul')) {
        throw 'in Bootstrap version 3 the pagination root item must be an ul element.'
      }

      this.currentPage = 1

      this.lastPage = 1

      this.setOptions(options)

      this.initialized = true
    },

    /**
     * Update the properties of the paginator element
     *
     * @param options options to config the paginator
     * */
    setOptions: function (options) {
      this.options = $.extend(
        {},
        this.options || $.fn.bootstrapPaginator.defaults,
        options,
      )

      this.totalPages = parseInt(this.options.totalPages, 10) //setup the total pages property.
      this.numberOfPages = parseInt(this.options.numberOfPages, 10) //setup the numberOfPages to be shown

      //move the set current page after the setting of total pages. otherwise it will cause out of page exception.
      if (options && typeof options.currentPage !== 'undefined') {
        this.setCurrentPage(options.currentPage)
      }

      this.listen()

      //render the paginator
      this.render()

      if (!this.initialized && this.lastPage !== this.currentPage) {
        this.$element.trigger('page-changed', [this.lastPage, this.currentPage])
      }
    },

    /**
     * Sets up the events listeners. Currently the pageclicked and pagechanged events are linked if available.
     *
     * */
    listen: function () {
      this.$element.off('page-clicked')

      this.$element.off('page-changed') // unload the events for the element

      if (typeof this.options.onPageClicked === 'function') {
        this.$element.bind('page-clicked', this.options.onPageClicked)
      }

      if (typeof this.options.onPageChanged === 'function') {
        this.$element.on('page-changed', this.options.onPageChanged)
      }

      this.$element.bind('page-clicked', this.onPageClicked)
    },

    /**
     *
     *  Destroys the paginator element, it unload the event first, then empty the content inside.
     *
     * */
    destroy: function () {
      this.$element.off('page-clicked')

      this.$element.off('page-changed')

      this.$element.removeData('bootstrapPaginator')

      this.$element.empty()
    },

    /**
     * Shows the page
     *
     * */
    show: function (page) {
      this.setCurrentPage(page)

      this.render()

      if (this.lastPage !== this.currentPage) {
        this.$element.trigger('page-changed', [this.lastPage, this.currentPage])
      }
    },

    /**
     * Shows the next page
     *
     * */
    showNext: function () {
      var pages = this.getPages()

      if (pages.next) {
        this.show(pages.next)
      }
    },

    /**
     * Shows the previous page
     *
     * */
    showPrevious: function () {
      var pages = this.getPages()

      if (pages.prev) {
        this.show(pages.prev)
      }
    },

    /**
     * Shows the first page
     *
     * */
    showFirst: function () {
      var pages = this.getPages()

      if (pages.first) {
        this.show(pages.first)
      }
    },

    /**
     * Shows the last page
     *
     * */
    showLast: function () {
      var pages = this.getPages()

      if (pages.last) {
        this.show(pages.last)
      }
    },

    /**
     * Internal on page item click handler, when the page item is clicked, change the current page to the corresponding page and
     * trigger the pageclick event for the listeners.
     *
     *
     * */
    onPageItemClicked: function (event) {
      var type = event.data.type,
        page = event.data.page

      this.$element.trigger('page-clicked', [event, type, page])
    },

    onPageClicked: function (event, originalEvent, type, page) {
      //show the corresponding page and retrieve the newly built item related to the page clicked before for the event return

      var currentTarget = $(event.currentTarget)

      switch (type) {
        case 'first':
          currentTarget.bootstrapPaginator('showFirst')
          break
        case 'prev':
          currentTarget.bootstrapPaginator('showPrevious')
          break
        case 'next':
          currentTarget.bootstrapPaginator('showNext')
          break
        case 'last':
          currentTarget.bootstrapPaginator('showLast')
          break
        case 'page':
          currentTarget.bootstrapPaginator('show', page)
          break
      }
    },

    /**
     * Renders the paginator according to the internal properties and the settings.
     *
     *
     * */
    render: function () {
      //fetch the container class and add them to the container
      var containerClass = this.getValueFromOption(
          this.options.containerClass,
          this.$element,
        ),
        size = this.options.size || 'normal',
        alignment = this.options.alignment || 'left',
        pages = this.getPages(),
        listContainer =
          this.options.bootstrapVersion === 2 ? $('<ul></ul>') : this.$element,
        listContainerClass =
          this.options.bootstrapVersion === 2
            ? this.getValueFromOption(
                this.options.listContainerClass,
                listContainer,
              )
            : null,
        first = null,
        prev = null,
        next = null,
        last = null,
        p = null,
        i = 0

      this.$element.prop('class', '')

      this.$element.addClass('pagination')

      switch (size.toLowerCase()) {
        case 'large':
        case 'small':
        case 'mini':
          this.$element.addClass(
            $.fn.bootstrapPaginator.sizeArray[this.options.bootstrapVersion][
              size.toLowerCase()
            ],
          )
          break
        default:
          break
      }

      if (this.options.bootstrapVersion === 2) {
        switch (alignment.toLowerCase()) {
          case 'center':
            this.$element.addClass('pagination-centered')
            break
          case 'right':
            this.$element.addClass('pagination-right')
            break
          default:
            break
        }
      }
      if (
        this.options.bootstrapVersion === 4 ||
        this.options.bootstrapVersion === 5
      ) {
        switch (alignment.toLowerCase()) {
          case 'center':
            this.$element.addClass('justify-content-center')
            break
          case 'right':
            this.$element.addClass('justify-content-end')
            break
          default:
            break
        }
      }

      this.$element.addClass(containerClass)

      //empty the outter most container then add the listContainer inside.
      this.$element.empty()

      if (this.options.bootstrapVersion === 2) {
        this.$element.append(listContainer)

        listContainer.addClass(listContainerClass)
      }

      //更新页面元素引用
      this.pageRef = []

      if (pages.first) {
        //如果存在第一个页面元素
        first = this.buildPageItem('first', pages.first)

        if (first) {
          listContainer.append(first)
        }
      }

      if (pages.prev) {
        //如果存在上一页元素

        prev = this.buildPageItem('prev', pages.prev)

        if (prev) {
          listContainer.append(prev)
        }
      }

      for (i = 0; i < pages.length; i = i + 1) {
        //填写数字页

        p = this.buildPageItem('page', pages[i])

        if (p) {
          listContainer.append(p)
        }
      }

      if (pages.next) {
        //如果有下一页

        next = this.buildPageItem('next', pages.next)

        if (next) {
          listContainer.append(next)
        }
      }

      if (pages.last) {
        //如果有最后一页
        last = this.buildPageItem('last', pages.last)
        if (last) {
          listContainer.append(last)
        }
      }
    },

    /**
     *
     * 根据给定的类型和页码创建页面项
     * @param page 页码
     * @param type 页面类型，无论是第一页、上一页、下一页还是最后一页
     * @return Object 构造的页面元素
     * */
    buildPageItem: function (type, page) {
      var itemContainer = $('<li></li>'), //创建项目容器
        itemContent = $('<a></a>'), //创建项目容器
        text = '',
        title = '',
        itemContainerClass = this.options.itemContainerClass(
          type,
          page,
          this.currentPage,
        ),
        itemContentClass = this.getValueFromOption(
          this.options.itemContentClass,
          type,
          page,
          this.currentPage,
        ),
        tooltipOpts = null
      switch (type) {
        case 'first':
          // if (
          //   !this.getValueFromOption(
          //     this.options.shouldShowPage,
          //     type,
          //     page,
          //     this.currentPage,
          //   )
          // ) {
          //   return
          // }
          text = this.options.itemTexts(type, page, this.currentPage)
          title = this.options.tooltipTitles(type, page, this.currentPage)
          break
        case 'last':
          // if (
          //   !this.getValueFromOption(
          //     this.options.shouldShowPage,
          //     type,
          //     page,
          //     this.currentPage,
          //   )
          // ) {
          //   return
          // }
          text = this.options.itemTexts(type, page, this.currentPage)
          title = this.options.tooltipTitles(type, page, this.currentPage)
          break
        case 'prev':
          // if (
          //   !this.getValueFromOption(
          //     this.options.shouldShowPage,
          //     type,
          //     page,
          //     this.currentPage,
          //   )
          // ) {
          //   return
          // }
          text = this.options.itemTexts(type, page, this.currentPage)
          title = this.options.tooltipTitles(type, page, this.currentPage)
          break
        case 'next':
          // if (
          //   !this.getValueFromOption(
          //     this.options.shouldShowPage,
          //     type,
          //     page,
          //     this.currentPage,
          //   )
          // ) {
          //   return
          // }
          text = this.options.itemTexts(type, page, this.currentPage)
          title = this.options.tooltipTitles(type, page, this.currentPage)
          break
        case 'page':
          if (
            !this.getValueFromOption(
              this.options.shouldShowPage,
              type,
              page,
              this.currentPage,
            )
          ) {
            return
          }
          text = this.options.itemTexts(type, page, this.currentPage)
          title = this.options.tooltipTitles(type, page, this.currentPage)
          break
      }

      // 输出首页上一页下一页尾页不可点击
      if (
        !this.getValueFromOption(
          this.options.shouldShowPage,
          type,
          page,
          this.currentPage,
        ) ||
        !this.getValueFromOption(
          this.options.shouldShowPage,
          type,
          page,
          this.currentPage,
        ) ||
        !this.getValueFromOption(
          this.options.shouldShowPage,
          type,
          page,
          this.currentPage,
        ) ||
        !this.getValueFromOption(
          this.options.shouldShowPage,
          type,
          page,
          this.currentPage,
        )
      ) {
        itemContainer.addClass('disabled').append(itemContent)
      } else {
        itemContainer.addClass(itemContainerClass).append(itemContent)
      }

      itemContent
        .addClass(itemContentClass)
        .html(text)
        .on(
          'click',
          null,
          { type: type, page: page },
          $.proxy(this.onPageItemClicked, this),
        )

      if (this.options.pageUrl) {
        itemContent.attr(
          'href',
          this.getValueFromOption(
            this.options.pageUrl,
            type,
            page,
            this.currentPage,
          ),
        )
      }

      if (this.options.useBootstrapTooltip) {
        tooltipOpts = $.extend({}, this.options.bootstrapTooltipOptions, {
          title: title,
        })
        // itemContent.tooltip(tooltipOpts)
      } else {
        // itemContent.attr('title', title)
      }
      itemContent.attr('href', '#')

      if (
        this.options.bootstrapVersion === 4 ||
        this.options.bootstrapVersion === 5
      ) {
        itemContainer.addClass('page-item')
        itemContent.addClass('page-link')
      }

      return itemContainer
    },

    setCurrentPage: function (page) {
      if (page > this.totalPages || page < 1) {
        // 如果当前页面超出范围，则引发异常。

        throw '页面超出范围'
      }

      this.lastPage = this.currentPage

      this.currentPage = parseInt(page, 10)
    },

    /**
     * 获取表示页对象当前状态的数组。数字页面可以通过数组模式访问。长度属性描述有多少数字页。可以通过属性First、prev、next和last访问第一、上一、下一和最后一页。当前属性标记页面中的当前页面。
     *
     * @return 对象输出具有first、prev、next、last以及其间的页数的对象。
     * */
    getPages: function () {
      var totalPages = this.totalPages, // get or calculate the total pages via the total records
        pageStart =
          this.currentPage % this.numberOfPages === 0
            ? (parseInt(this.currentPage / this.numberOfPages, 10) - 1) *
                this.numberOfPages +
              1
            : parseInt(this.currentPage / this.numberOfPages, 10) *
                this.numberOfPages +
              1, //calculates the start page.
        output = [],
        i = 0,
        counter = 0

      pageStart = pageStart < 1 ? 1 : pageStart //check the range of the page start to see if its less than 1.

      for (
        i = pageStart, counter = 0;
        counter < this.numberOfPages && i <= totalPages;
        i = i + 1, counter = counter + 1
      ) {
        //fill the pages
        output.push(i)
      }

      output.first = 1 //add the first when the current page leaves the 1st page.

      if (this.currentPage > 1) {
        // add the previous when the current page leaves the 1st page
        output.prev = this.currentPage - 1
      } else {
        output.prev = 1
      }

      if (this.currentPage < totalPages) {
        // add the next page when the current page doesn't reach the last page
        output.next = this.currentPage + 1
      } else {
        output.next = totalPages
      }

      output.last = totalPages // add the last page when the current page doesn't reach the last page

      output.current = this.currentPage //mark the current page.

      output.total = totalPages

      output.numberOfPages = this.options.numberOfPages

      return output
    },

    /**
     * Gets the value from the options, this is made to handle the situation where value is the return value of a function.
     *
     * @return mixed value that depends on the type of parameters, if the given parameter is a function, then the evaluated result is returned. Otherwise the parameter itself will get returned.
     * */
    getValueFromOption: function (value) {
      var output = null,
        args = Array.prototype.slice.call(arguments, 1)

      if (typeof value === 'function') {
        output = value.apply(this, args)
      } else {
        output = value
      }

      return output
    },
  }

  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  old = $.fn.bootstrapPaginator

  $.fn.bootstrapPaginator = function (option) {
    var args = arguments,
      result = null

    $(this).each(function (index, item) {
      var $this = $(item),
        data = $this.data('bootstrapPaginator'),
        options = typeof option !== 'object' ? null : option

      if (!data) {
        data = new BootstrapPaginator(this, options)

        $this = $(data.$element)

        $this.data('bootstrapPaginator', data)

        return
      }

      if (typeof option === 'string') {
        if (data[option]) {
          result = data[option].apply(data, Array.prototype.slice.call(args, 1))
        } else {
          throw 'Method ' + option + ' does not exist'
        }
      } else {
        result = data.setOptions(option)
      }
    })

    return result
  }

  $.fn.bootstrapPaginator.sizeArray = {
    2: {
      large: 'pagination-large',
      small: 'pagination-small',
      mini: 'pagination-mini',
    },
    3: {
      large: 'pagination-lg',
      small: 'pagination-sm',
      mini: '',
    },
    4: {
      large: 'pagination-lg',
      small: 'pagination-sm',
      mini: '',
    },
    5: {
      large: 'pagination-lg',
      small: 'pagination-sm',
      mini: '',
    },
  }

  $.fn.bootstrapPaginator.defaults = {
    containerClass: '',
    size: 'normal',
    alignment: 'left',
    bootstrapVersion: 2,
    listContainerClass: '',
    itemContainerClass: function (type, page, current) {
      return page === current ? 'active' : ''
    },
    itemContentClass: function (type, page, current) {
      return ''
    },
    currentPage: 1,
    numberOfPages: 5,
    totalPages: 1,
    pageUrl: function (type, page, current) {
      return null
    },
    onPageClicked: null,
    onPageChanged: null,
    useBootstrapTooltip: false,
    shouldShowPage: function (type, page, current) {
      var result = true

      switch (type) {
        case 'first':
          result = current !== 1
          break
        case 'prev':
          result = current !== 1
          break
        case 'next':
          result = current !== this.totalPages
          break
        case 'last':
          result = current !== this.totalPages
          break
        case 'page':
          result = true
          break
      }

      return result
    },
    itemTexts: function (type, page, current) {
      switch (type) {
        case 'first':
          return '&lt;&lt;'
        case 'prev':
          return '&lt;'
        case 'next':
          return '&gt;'
        case 'last':
          return '&gt;&gt;'
        case 'page':
          return page
      }
    },
    tooltipTitles: function (type, page, current) {
      switch (type) {
        case 'first':
          return 'Go to first page'
        case 'prev':
          return 'Go to previous page'
        case 'next':
          return 'Go to next page'
        case 'last':
          return 'Go to last page'
        case 'page':
          return page === current
            ? 'Current page is ' + page
            : 'Go to page ' + page
      }
    },
    bootstrapTooltipOptions: {
      animation: true,
      html: true,
      placement: 'top',
      selector: false,
      title: '',
      container: false,
    },
  }

  $.fn.bootstrapPaginator.Constructor = BootstrapPaginator
})(window.jQuery)
