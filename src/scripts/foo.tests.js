import {Foo} from './foo';

export function test_foo(test) {
  var _ = new Foo();
  test.ok(true);
  test.done();
}
