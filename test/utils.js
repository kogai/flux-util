const assert = require('assert');
const merge = require('lib/utils').merge;

describe('便利関数', ()=> {
  it('オブジェクトをマージできる', ()=> {
    const merged = merge({ props: 'props' }, { keys: 'keys' });
    assert(merged.props === 'props');
    assert(merged.keys === 'keys');
  });

  it('元のオブジェクトを破壊しない', ()=> {
    var preMerge = { notModified: 'notModified' };
    const merged = merge(preMerge, { props: 'props' });
    merged.notModified = '';
    assert(preMerge.notModified === 'notModified');
    assert(merged.notModified === '');
  });

  it('プロパティの衝突は上書きされる', ()=> {
    const merged = merge({ props: 'props' }, { props: 'override' });
    assert(merged.props === 'override');
  });

  it('子孫構造のオブジェクトもマージされる', ()=> {
    const child = {
      children: 'children',
    };
    const merged = merge({
      props: child
    }, { keys: 'keys' });
    assert(merged.props === child);
    assert(merged.props.children === 'children');
  });

  it('可変長引数を受け取れる', ()=> {
    const merged = merge({ props: 'props' }, { keys: 'keys' }, { args: 'args' });
    assert(merged.props === 'props');
    assert(merged.keys === 'keys');
    assert(merged.args === 'args');
  });
});
