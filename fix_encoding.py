#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
确保所有markdown文件都是UTF-8 with BOM编码
这样GitHub和所有编辑器都能正确显示中文
"""

import os
import glob

def add_bom_to_file(filepath):
    """为UTF-8文件添加BOM标记"""
    try:
        # 读取文件内容
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 写入时添加BOM
        with open(filepath, 'w', encoding='utf-8-sig') as f:
            f.write(content)

        print(f'✅ {os.path.basename(filepath)} - 已添加BOM')
        return True
    except Exception as e:
        print(f'❌ {os.path.basename(filepath)} - 错误: {e}')
        return False

def main():
    # 切换到脚本所在目录
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # 需要处理的文件
    files = [
        'README.md',
        'info.md',
        'INSTALL.md',
        'QUICKSTART.md',
        'TESTING_GUIDE.md',
        'MIGRATION.md',
        'PROJECT_SUMMARY.md',
        'FILE_CHECKLIST.md',
        'GITHUB_SETUP.md',
        'UPLOAD_CHECKLIST.md',
        'CHANGELOG.md'
    ]

    print('🔧 开始处理文件编码...')
    print()

    success_count = 0
    for filename in files:
        if os.path.exists(filename):
            if add_bom_to_file(filename):
                success_count += 1
        else:
            print(f'⚠️  {filename} - 文件不存在')

    print()
    print(f'✅ 完成！成功处理 {success_count}/{len(files)} 个文件')
    print()
    print('📝 说明：')
    print('  - 所有文件已转换为UTF-8 with BOM编码')
    print('  - GitHub将正确显示中文')
    print('  - VSCode/记事本等编辑器也能正确显示')
    print()
    print('🚀 现在可以上传到GitHub了！')

if __name__ == '__main__':
    main()
