const TestRunner = require('test-runner')
const os = require('os')
const commonDir = require('./')
const a = require('assert')

const runner = new TestRunner()

if (os.platform() === 'win32') {
  runner.test('commonDir: simple (win)', function (t) {
    const input = [
      'C:\\Users\\IEUser\\Documents\\GitHub\\wodge',
      'C:\\Users\\IEUser\\Documents\\GitHub\\wodge\\folder',
      'C:\\Users\\IEUser\\Documents\\GitHub\\wodge\\folder\\five',
      'C:\\Users\\IEUser\\Documents\\GitHub\\wodge\\folder\\four',
    ]
    a.strictEqual(commonDir(input), 'C:\\Users\\IEUser\\Documents\\GitHub\\')
  })

  runner.test('commonDir: wildly diff folders (win)', function (t) {
    const input = [
      'C:\\this\\that',
      'C:\\another\\something',
      'C:\\andagain\\different'
    ]
    a.strictEqual(commonDir(input), 'C:\\')
  })

  runner.test('commonDir: just one (win)', function (t) {
    const input = [
      'C:\\Users\\Lloyd\\Documents\\LEGO Creations\\MINDSTORMS EV3 Projects\\Randomness.ev3'
    ]
    a.strictEqual(commonDir(input), 'C:\\Users\\Lloyd\\Documents\\LEGO Creations\\MINDSTORMS EV3 Projects\\')
  })

} else {
  runner.test('commonDir: simple', function (t) {
    const input = [
      '/Users/Lloyd/Documents/Kunai/renamer/one',
      '/Users/Lloyd/Documents/Kunai/renamer/folder/folder/five',
      '/Users/Lloyd/Documents/Kunai/renamer/folder/four',
      '/Users/Lloyd/Documents/Kunai/another',
      '/Users/Lloyd/Documents/Kunai/renamer/two',
      '/Users/Lloyd/Documents/Kunai/renamer/folder/three',
      '/Users/Lloyd/Documents/Kunai/renamer'
    ]
    a.strictEqual(commonDir(input), '/Users/Lloyd/Documents/Kunai/')
  })

  runner.test('commonDir: wildly diff folders', function (t) {
    const input = [ '/this/that', '/another/something', '/andagain/different' ]
    a.strictEqual(commonDir(input), '/')
  })

  runner.test('commonDir: another', function (t) {
    const input = [
      '/Users/Lloyd/Documents/LEGO Creations/MINDSTORMS EV3 Projects/Randomness.ev3',
      '/Users/Lloyd/Desktop/Screen Shot 2014-03-27 at 10.00.12.png'
    ]
    a.strictEqual(commonDir(input), '/Users/Lloyd/')
  })

  runner.test('commonDir: just one', function (t) {
    const input = [
      '/Users/Lloyd/Documents/LEGO Creations/MINDSTORMS EV3 Projects/Randomness.ev3'
    ]
    a.strictEqual(commonDir(input), '/Users/Lloyd/Documents/LEGO Creations/MINDSTORMS EV3 Projects/')
  })

  runner.test('commonDir: all same folder', function (t) {
    const input = [
      '/Users/Lloyd/Documents/Kunai/renamer/one',
      '/Users/Lloyd/Documents/Kunai/renamer/two',
      '/Users/Lloyd/Documents/Kunai/renamer/three'
    ]
    a.strictEqual(commonDir(input), '/Users/Lloyd/Documents/Kunai/renamer/')
  })

  runner.test('commonDir: hangs', function (t) {
    const input = [
      'file1.txt',
      'file1.txt'
    ]
    a.strictEqual(commonDir(input), './')
  })

  runner.test('commonDir: file and parent folder', function (t) {
    const input = [
      '/Users/Lloyd/Documents/Kunai/renamer/one',
      '/Users/Lloyd/Documents/Kunai/renamer'
    ]
    a.strictEqual(commonDir(input), '/Users/Lloyd/Documents/Kunai/')
  })
}
