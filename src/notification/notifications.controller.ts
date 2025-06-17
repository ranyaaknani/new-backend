import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('add')
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.notificationService.findByUserId(userId);
  }

  @Get('user/:userId/unread-count')
  getUnreadCount(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.notificationService.getUnreadCount(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(id, updateNotificationDto);
  }

  @Patch(':notificationId/mark-read/:userId')
  markAsRead(
    @Param('notificationId', ParseUUIDPipe) notificationId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.notificationService.markAsRead(notificationId, userId);
  }

  @Patch(':notificationId/mark-unread/:userId')
  markAsUnread(
    @Param('notificationId', ParseUUIDPipe) notificationId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.notificationService.markAsUnread(notificationId, userId);
  }

  @Patch('user/:userId/mark-all-read')
  markAllAsRead(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.notificationService.markAllAsRead(userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationService.remove(id);
  }
}
