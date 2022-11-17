/**
 * 快速创建类型
 */

type Coord = Record<'x' | 'y', number>;

/**
 * 将类型定义的所有属性改为可选
 */
type Coord1 = Partial<Record<'x' | 'y', number>>;


/**
 * 数据只读
 */
type Coord2 = Readonly<Record<'x' | 'y', number>>;

// ===>
type Coord3 = {
    readonly x: number;
    readonly y: number;
}

/**
 * 从类型定义中选取，一组属性值
 */

type Coord4 = Pick<Coord, 'y'>;

// ===>
type Coord5 = {
    y: number;
}