import bitcore from 'bitcore-lib';
import _ from 'lodash';

export function getTransaction(type) {
  const Transaction = bitcore.Transaction;
  const Input = Transaction.Input;
  const Output = Transaction.Output;

  const checkArgument = function (condition, argumentName, message, docsPath) {
    if (!condition) {
      throw new bitcore.errors.InvalidArgument(argumentName, message, docsPath);
    }
  };

  if (type === 'vxxl') {
    Transaction.prototype.fromBufferReader = function (reader) {
      checkArgument(!reader.finished(), 'No transaction data received');
      var i, sizeTxIns, sizeTxOuts;
      console.log('fromBufferReader');
      this.version = reader.readUInt32LE();

      // ppcoin: deserialize timestamp
      this.timestamp = reader.readUInt32LE();

      sizeTxIns = reader.readVarintNum();
      for (i = 0; i < sizeTxIns; i++) {
        var input = Input.fromBufferReader(reader);
        this.inputs.push(input);
      }
      sizeTxOuts = reader.readVarintNum();
      for (i = 0; i < sizeTxOuts; i++) {
        this.outputs.push(Output.fromBufferReader(reader));
      }
      this.nLockTime = reader.readUInt32LE();
      return this;
    };
  } else {
    Transaction.prototype.fromBufferReader = function (reader) {
      checkArgument(!reader.finished(), 'No transaction data received');
      this.version = reader.readInt32LE();
      var sizeTxIns = reader.readVarintNum();

      // check for segwit
      var hasWitnesses = false;
      if (sizeTxIns === 0 && reader.buf[reader.pos] !== 0) {
        reader.pos += 1;
        hasWitnesses = true;
        sizeTxIns = reader.readVarintNum();
      }

      for (var i = 0; i < sizeTxIns; i++) {
        var input = Input.fromBufferReader(reader);
        this.inputs.push(input);
      }

      var sizeTxOuts = reader.readVarintNum();
      for (var j = 0; j < sizeTxOuts; j++) {
        this.outputs.push(Output.fromBufferReader(reader));
      }

      if (hasWitnesses) {
        for (var k = 0; k < sizeTxIns; k++) {
          var itemCount = reader.readVarintNum();
          var witnesses = [];
          for (var l = 0; l < itemCount; l++) {
            var size = reader.readVarintNum();
            var item = reader.read(size);
            witnesses.push(item);
          }
          this.inputs[k].setWitnesses(witnesses);
        }
      }

      this.nLockTime = reader.readUInt32LE();
      return this;
    };
  }

  if (type === 'vxxl') {
    Transaction.prototype.toBufferWriter = function (writer) {
      writer.writeUInt32LE(this.version);
      console.log('toBufferWriter');
      // ppcoin: if no timestamp present, take current time (in seconds)
      var timestamp = this.timestamp
        ? this.timestamp
        : new Date().getTime() / 1000;
      writer.writeUInt32LE(timestamp);

      writer.writeVarintNum(this.inputs.length);
      _.each(this.inputs, function (input) {
        input.toBufferWriter(writer);
      });
      writer.writeVarintNum(this.outputs.length);
      _.each(this.outputs, function (output) {
        output.toBufferWriter(writer);
      });
      writer.writeUInt32LE(this.nLockTime);
      return writer;
    };
  } else {
    Transaction.prototype.toBufferWriter = function (writer, noWitness) {
      writer.writeInt32LE(this.version);

      var hasWitnesses = this.hasWitnesses();

      if (hasWitnesses && !noWitness) {
        writer.write(Buffer.from('0001', 'hex'));
      }

      writer.writeVarintNum(this.inputs.length);

      _.each(this.inputs, function (input) {
        input.toBufferWriter(writer);
      });

      writer.writeVarintNum(this.outputs.length);
      _.each(this.outputs, function (output) {
        output.toBufferWriter(writer);
      });

      if (hasWitnesses && !noWitness) {
        _.each(this.inputs, function (input) {
          var witnesses = input.getWitnesses();
          writer.writeVarintNum(witnesses.length);
          for (var j = 0; j < witnesses.length; j++) {
            writer.writeVarintNum(witnesses[j].length);
            writer.write(witnesses[j]);
          }
        });
      }

      writer.writeUInt32LE(this.nLockTime);
      return writer;
    };
  }

  return Transaction;
}
