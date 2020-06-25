
const AvatarColors = ['#FFD659', '#FFC168', '#F58268', '#F4979C', '#EC7F87', '#FF78CB', '#C377E0', '#8BAAFF', '#78DCFA', '#88E5B9', '#BFF199', '#C5E1A5', '#CD907D', '#BE938E', '#B68F91', '#BC987B', '#A69E8E', '#D4C99E', '#93C2E6', '#92C3D9', '#8FBFC5', '#80CBC4', '#A4DBDB', '#B2C8BD', '#F7C8C9', '#DCC6E4', '#BABAE8', '#BABCD5', '#AD98DA', '#C097D9']
import { BigNumber } from 'bignumber.js'

export function getAvatarColor(id) {
  let result = typeof BigInt === 'function' ? uuidHashCode(id) : ios(id)
  return AvatarColors[result % AvatarColors.length]
}

function uuidHashCode(id) {
  let components = id.split('-')
  components = components.map(item => '0x' + item)
  let mostSigBits = BigInt(components[0])
  mostSigBits <<= BigInt(16)
  mostSigBits = BigInt.asIntN(64, mostSigBits)
  let c1 = BigInt(components[1])
  mostSigBits |= c1
  mostSigBits <<= BigInt(16)
  mostSigBits = BigInt.asIntN(64, mostSigBits)
  let c2 = BigInt(components[2])
  mostSigBits |= c2
  let leastSigBits = BigInt(components[3])
  leastSigBits <<= BigInt(48)
  leastSigBits = BigInt.asIntN(64, leastSigBits)
  let c4 = BigInt(components[4])
  leastSigBits |= c4
  let hilo = mostSigBits ^ leastSigBits
  hilo = BigInt.asIntN(64, hilo)
  let m = BigInt.asIntN(32, (hilo >> BigInt(32)))
  let n = BigInt.asIntN(32, hilo)
  let result = Number(m ^ n)
  return Math.abs(result)
}

function ios(id) {
  let components = id.split('-')
  let mostSigBits = parseInt(components[0], 16)
  mostSigBits = BigNumber(mostSigBits)
  mostSigBits = mostSigBits.multipliedBy(BigNumber(2).pow(16)).toString()
  mostSigBits = asIntN(64, mostSigBits)
  let c1 = parseInt(components[1], 16)
  mostSigBits = bigIntOr(mostSigBits, c1)
  mostSigBits = BigNumber(mostSigBits).multipliedBy(BigNumber(2).pow(16)).toString()
  mostSigBits = asIntN(64, mostSigBits)
  let c2 = parseInt(components[2], 16)
  mostSigBits = bigIntOr(mostSigBits, c2)
  mostSigBits = asIntN(64, mostSigBits)
  let leastSigBits = parseInt(components[3], 16)
  leastSigBits = BigNumber(leastSigBits).multipliedBy(BigNumber(2).pow(48)).toString()
  leastSigBits = asIntN(64, leastSigBits)
  let c4 = parseInt(components[4], 16)
  leastSigBits = bigIntOr(leastSigBits, c4)
  leastSigBits = asIntN(64, leastSigBits)
  let hilo = bigIntXOr(mostSigBits, leastSigBits)
  hilo = asIntN(64, hilo)
  BigNumber.config({ ROUNDING_MODE: 3, DECIMAL_PLACES: 0 })
  let m = (BigNumber(hilo).div(BigNumber(2).pow(32))).toString()
  let n = asIntN(32, hilo).toString()
  let result = bigIntXOr(m, n)
  result = asIntN(32, result)
  return Math.abs(result)
}

function asIntN(bits, number) {
  let binNum = toBin(number)
  let { length } = binNum
  if (length < bits) return BigNumber(binNum, 2).toString()
  let t = binNum.substr(binNum.length - bits)
  if (t[0] === '0') {
    return BigNumber(t, 2)
  } else if (t[0] === '1') {
    t = t.substr(1)
    let result = ''
    for (let i = 0; i < t.length; i++) {
      result += t[i] === '1' ? '0' : '1'
    }
    return BigNumber(result, 2).plus(1).multipliedBy(-1).toString()
  }
}

function toBin(intNum, bits) {
  if (/\d+/.test(intNum)) {
    BigNumber.config({ ROUNDING_MODE: 3, DECIMAL_PLACES: 0 })
    intNum = BigNumber(intNum)
    let is_positive_number = true
    if (intNum.lt(0)) is_positive_number = false
    let answer = ""
    let tmp_number = 0
    if (is_positive_number) {
      while (!intNum.isZero()) {
        answer = intNum.mod(2).toString() + answer
        intNum = intNum.div(2)
        if (tmp_number++ > 200) break
      }
    } else {
      intNum = intNum.abs().minus(1)
      while (!intNum.isZero()) {
        answer = intNum.mod(2).toString() + answer
        intNum = intNum.div(2)
        if (tmp_number++ > 200) break
      }
      let str = addZero(bits - answer.length) + answer
      let _answer = ""
      for (let i = 0; i < str.length; i++) {
        _answer += str[i] === '1' ? '0' : '1'
      }
      return _answer
    }
    if (answer.length === 0) return '0'
    return answer;
  } else return "0";
}

function addZero(num) {
  let result = '';
  for (let i = 0; i < num; i++) {
    result = result + '0'
  }
  return result;
}
function bigIntOr(str1, str2, bits = 64) {
  let result = ''
  str1 = toBin(str1, bits)
  str2 = toBin(str2, bits)
  if (str1.length < str2.length) {
    let temp = str1
    str1 = str2
    str2 = temp
  }
  str2 = addZero(str1.length - str2.length) + str2

  for (let i = 0; i < str2.length; i++) {
    result += (str1[i] == '1' || str2[i] == '1') ? '1' : '0'
  }
  result = str1.substring(0, str1.length - str2.length) + result
  return BigNumber(result, 2).toString()
}

function bigIntXOr(str1, str2, bits = 64) {
  let result = ''
  str1 = toBin(str1, bits)
  str2 = toBin(str2, bits)
  if (str1.length < str2.length) {
    let temp = str1
    str1 = str2
    str2 = temp
  }
  str2 = addZero(str1.length - str2.length) + str2

  for (let i = 0; i < str2.length; i++) {
    result += (str1[i] == str2[i]) ? '0' : '1'
  }
  result = str1.substring(0, str1.length - str2.length) + result
  return BigNumber(result, 2).toString()
}