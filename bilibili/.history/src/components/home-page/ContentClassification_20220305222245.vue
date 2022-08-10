<template>
  <!-- 分类 -->
  <div class="content_classification">
    <!-- 大类 -->
    <div class="broad_heading">
      <ul class="broad_heading_ul">
        <li v-for="(item) in broad_heading_ul_li" :key="item">
          <a href="#">
            <div class="broad_heading_picture"></div>
            <span>{{ item }}</span>
          </a>
        </li>
      </ul>
    </div>
    <span class="the_divider_1"></span>
    <!-- 细分类 -->
    <div class="content_classification_subdivision">
      <ul>
        <li v-for="(item) in content_subdivision_list_up" :key="item">
          <a href="#">
            <el-dropdown class="content_subdivision_item" placement="top-start">
              <div class="el-dropdown-link">
                <span class="content_subdivision_item_span">
                  {{ item }}
                </span>
                <div class="content_subdivision_num">
                  <em class="content_subdivision_num_color"> 999+ </em>
                </div>
              </div>
              <el-dropdown-menu
                slot="dropdown"
                class="content_subdivision_dropdown_menu"
              >
                <el-dropdown-item
                  v-for="(item1) in content_subdivision_list_float" :key="item1"
                >
                  {{ item1 }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </a>
        </li>
        <li v-for="(item) in content_subdivision_list_down" :key="item">
          <a href="#">
            <el-dropdown class="content_subdivision_item">
              <div class="el-dropdown-link">
                <span class="content_subdivision_item_span">
                  {{ item }}
                </span>
                <div class="content_subdivision_num">
                  <em class="content_subdivision_num_color"> 999+ </em>
                </div>
              </div>
              <el-dropdown-menu
                slot="dropdown"
                class="content_subdivision_dropdown_menu"
              >
                <el-dropdown-item
                  v-for="(item1) in content_subdivision_list_float" :key="item1"
                >
                  {{ item1 }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </a>
        </li>
        <li class="special">
          <el-dropdown class="content_subdivision_item">
            <div class="el-dropdown-link">
              <div class="content_subdivision_item_span">
                <span class="content_subdivision_item_span_more"> 更多 </span>
              </div>
              <div class="content_subdivision_num">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
            </div>
            <el-dropdown-menu
              slot="dropdown"
              class="content_subdivision_dropdown_menu"
            >
              <el-dropdown-item>搞笑</el-dropdown-item>
              <el-dropdown-item>家具房产</el-dropdown-item>
              <el-dropdown-item>手工</el-dropdown-item>
              <el-dropdown-item>绘画</el-dropdown-item>
              <el-dropdown-item>日常</el-dropdown-item>
              <el-dropdown-item>预告</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <span class="the_divider_2"></span>
    <!-- 功能分类 -->
    <div class="content_functional_classification">
      <ul>
        <li v-for="(item) in content_functional_classification" :key="item">
          <a href="#">
            <div class="broad_heading_picture"></div>
            <span>{{ item }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

