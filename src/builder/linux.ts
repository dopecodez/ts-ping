import { commandBuilder, extendedPingOptions } from '../types'
import { ERROR_MESSAGES } from '../messages';
import { emitWarning } from 'process';

const linux = (ip: string, options?: extendedPingOptions): commandBuilder => {
   let defaultNumberOfEchoes = '4';
   let args: Array<string> = [];
   let buildCommand: commandBuilder = {
      command: 'ping',
      arguments: args
   };
   args.push(ip);
   if (!options) {
      buildCommand.arguments.push('-n', defaultNumberOfEchoes);
      return buildCommand;
   }
   if (typeof options?.numberOfEchos === 'number') {
      args.push('-n', options.numberOfEchos.toString());
   } else {
      args.push('-n', defaultNumberOfEchoes);
   }
   if (options?.soDebugOption) {
      args.push('-d');
   }
   if (typeof options?.interval === 'number') {
      if (options?.floodPing) {
         args.push('-f');
         emitWarning(ERROR_MESSAGES.FLOOD_AND_INTERVAL_ARGS, 'argumentWarning');
      } else {
         args.push('-i', options?.interval.toString())
      }
   }
   if (options?.floodPing) {
      if (typeof options?.interval === 'number') {
          args.push('-i', options?.interval.toString())
      } else {
          args.push('-f');
          emitWarning(ERROR_MESSAGES.FLOOD_AND_INTERVAL_ARGS, 'argumentWarning');
      }
  }
   if (typeof options?.interfaceAddress === 'string') {
      args.push('-I', options.interfaceAddress);
   }
   if (options?.suppressLoopback) {
      args.push('-L');
   }
   if (typeof options?.TTL === 'number') {
      args.push('-t', options.TTL.toString());
   }
   if (options?.numeric) {
      args.push('-n');
   }
   if (typeof options?.pattern === 'string') {
      args.push('-p', options.pattern);
   }
   if (options?.quiet) {
      args.push('-q');
   }
   if (typeof options?.bufferSize === 'number') {
      args.push('-s', options.bufferSize.toString())
   }
   if (typeof options?.timeBeforeExit === 'number') {
      args.push('-W', options.timeBeforeExit.toString());
   }
   if (options?.verboseOutput) {
      args.push('-v')
   }
   if (typeof options?.timeout === 'number') {
      args.push('-w', options.timeout.toString())
   }
   if (options?.IPV6) {
      buildCommand.command = 'ping6'
   }
   buildCommand.arguments = args;
   return buildCommand;
};

export default linux;