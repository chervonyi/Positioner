let _vault = [];

class Log {
    static commit(prevPos, newPos) {
        var object = {
            num: _vault.length,
            rollback: prevPos,
            pos: newPos
        };
        let commitNum = _vault.length;
        _vault.push(object);
        return commitNum;
    }

    static rollback(index) {
        var object = _vault[index];
        return object['rollback'];
    }
}
