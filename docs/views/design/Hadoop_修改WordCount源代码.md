---
layout: post
title: Hadoop_修改WordCount源代码
data: 2020-11-1
author: Li_7
categories:
    - 设计部
tags:
    -Hadoop
---
## 题目要求
1.数据清洗：对每个词的格式进行规范化（去除不以英文字母开头的所有词）

2.词频少于3次的数据不在结果中显示

3.结果以有限数量的“+”表示词频统计

4.自定义一个Partitioner类和getPartition()方法，将大写字母开头的词分配到一个reducer，将小写字母开头的词分配到另一个reducer

## 解题思路
1. 运用函数 Character.isLowerCase(s.charAt(0)) 和 Character.isUpperCase(s.charAt(0))来查 找单词开头是否是大写字母或者小写字母构成的，从而来筛选由字母打头的单词。

2. 用 if 语句来判断是否出现的频率大于 3，若大于则可以输出。

3. 在原来的代码中，是在 IntSumReducer 类中来累计单词出现频率，用输出 sum表示，在修改时只需在此基础上建立 Stringbuilder 对象 s，再用 for 循环语句和 append 函数将数 字频率 sum转换成‘+’字符，输出<key,s>。此时输出的类型为 text。并注释掉主函数 中的 job.setCombinerClass(IntSumReducer.class)。

4. 通过是否满足条件 Character.isLowerCase(s.charAt(0))来判断是否为小写字母打头的字 符串，如果是则返回 0，如果不是返回 1。


##代码如下


```javascript
import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.Partitioner;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class WordCount {

  public static class TokenizerMapper
       extends Mapper<Object, Text, Text, IntWritable>{

    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();

    public void map(Object key, Text value, Context context
                    ) throws IOException, InterruptedException {
      StringTokenizer itr = new StringTokenizer(value.toString());
      while (itr.hasMoreTokens()) {
        String s=itr.nextToken();
      if(Character.isLowerCase(s.charAt(0))||Character.isUpperCase(s.charAt(0))){
       word.set(s);
        context.write(word, one);
      }
      }
    }
  }

  public class myPartitioner extends Partitioner<Text,IntWritable>{
  	public int getPartition(Text key, IntWritable value, int numPartitions)
	{
		String s= key.toString();
               if(Character.isLowerCase(s.charAt(0)))
              return 0;
                 else 
               return 1;
	}
  }

  public static class IntSumReducer
       extends Reducer<Text,IntWritable,Text,Text> {
    private Text result = new Text();

    public void reduce(Text key, Iterable<IntWritable> values,
                       Context context
                       ) throws IOException, InterruptedException {
      int sum = 0;
	for (IntWritable val : values) {
		sum += val.get();
      }
	if(sum>=3){
		StringBuilder s=new StringBuilder();
		for(int i=0;i<sum;i++){
			s.append("+");
					}
    result.set(s.toString());
    context.write(key, result);
}
    }
  }

  public static void main(String[] args) throws Exception {
    Configuration conf = new Configuration();
    Job job = Job.getInstance(conf, "word count");
    job.setJarByClass(WordCount.class);
    job.setMapperClass(TokenizerMapper.class);
    //job.setCombinerClass(IntSumReducer.class);
    job.setReducerClass(IntSumReducer.class);
    job.setPartitionerClass(myPartitioner.class);
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);
    FileInputFormat.addInputPath(job, new Path(args[0]));
    FileOutputFormat.setOutputPath(job, new Path(args[1]));
    System.exit(job.waitForCompletion(true) ? 0 : 1);
  }
}


```

​          